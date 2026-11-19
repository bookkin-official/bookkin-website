param(
    [string]$AppRepository = (Join-Path $PSScriptRoot '..\..\bookkin'),
    [string]$Flutter = 'C:\flutter\bin\flutter.bat'
)

$ErrorActionPreference = 'Stop'
$websiteRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$appRoot = (Resolve-Path -LiteralPath $AppRepository).Path
$fixtureSource = Join-Path $PSScriptRoot 'fixtures\website_screens_preview_test.dart'
$fixtureTarget = Join-Path $appRoot 'tool\website_screens_preview_test.dart'
$screenOutput = Join-Path $websiteRoot 'src\assets\screens'

if (!(Test-Path -LiteralPath $Flutter)) { throw "Flutter not found: $Flutter" }
if (!(Test-Path -LiteralPath (Join-Path $appRoot 'pubspec.yaml'))) { throw 'App repository must be the Bookkin Flutter source.' }
if (Test-Path -LiteralPath $fixtureTarget) { throw "Refusing to overwrite existing fixture: $fixtureTarget" }

$oldOutput = $env:BOOKKIN_WEBSITE_SCREENS
$oldFlutterRoot = $env:FLUTTER_ROOT
$env:BOOKKIN_WEBSITE_SCREENS = $screenOutput
$env:FLUTTER_ROOT = Split-Path -Parent (Split-Path -Parent $Flutter)
Copy-Item -LiteralPath $fixtureSource -Destination $fixtureTarget

try {
    Push-Location -LiteralPath $appRoot
    try {
        # Use fresh engine/font state for each locale.
        foreach ($locale in @('en', 'Hant', 'Hans')) {
            & $Flutter test --no-pub tool/website_screens_preview_test.dart --plain-name "website screenshots $locale" --reporter expanded
            if ($LASTEXITCODE -ne 0) { throw "Screenshot capture failed for $locale" }
        }
        $appRevision = (& git rev-parse HEAD).Trim()
        if ($LASTEXITCODE -ne 0) { throw 'Unable to identify app source revision.' }
        Write-Output "Captured Profile, People and scan review for EN/Hant/Hans at 780 x 1688 from $appRevision"
    } finally {
        Pop-Location
    }
} finally {
    Remove-Item -LiteralPath $fixtureTarget
    $env:BOOKKIN_WEBSITE_SCREENS = $oldOutput
    $env:FLUTTER_ROOT = $oldFlutterRoot
}
