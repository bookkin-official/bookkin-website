import QRCode from "qrcode";
import { settings } from "../../site.config.mjs";
export async function GET() {
  const buffer = await QRCode.toBuffer(settings.GOOGLE_PLAY_URL, {
    type: "png",
    width: 480,
    margin: 4,
    errorCorrectionLevel: "M",
    color: { dark: "#293c50", light: "#FFFFFF" },
  });
  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/png" },
  });
}
