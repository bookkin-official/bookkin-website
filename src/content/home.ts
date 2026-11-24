export type Locale = "en" | "zh-Hant" | "zh-Hans";
const en = {
  title: "Bookkin — Meet through the books on your shelf",
  description:
    "A home for your books and the people you find through them. Scan your books, build a personal bookshelf and discover fellow readers with Bookkin.",
  nav: ["The bookshelf", "Getting started", "Get Bookkin"],
  skip: "Skip to content",
  menu: "Menu",
  language: "Language",
  device: "Use device language",
  themeLight: "Switch to light mode",
  themeDark: "Switch to dark mode",
  hero: {
    eyebrow: "Your books. Your people.",
    lines: ["Meet through", "the books", "on your shelf."],
    text: "A little space for the books you love. And the people who love them, too.",
  },
  play: "Get Bookkin on Google Play",
  photoAlt:
    "A reader using her phone beside sunlit shelves in a Hong Kong neighbourhood bookshop.",
  photoCaption: "A little closer to your next chapter.",
  tourTitle: "Every shelf\ntells a story.",
  tourIntro: "Start with a book you love. See where it takes you.",
  chapters: [
    {
      tab: "Scan a book",
      title: "From your hands\nto your shelf.",
      text: "Scan a cover or a row of book spines. Check the details, make your edits, then add the books you choose.",
      screen: "Review your scan",
      alt: "Bookkin scan review with sample books ready to check before saving.",
      photoAlt:
        "A reader aims a phone camera at book spines, with Bookkin visible on the screen.",
    },
    {
      tab: "Build your shelf",
      title: "Make room for\nyour kind of books.",
      text: "Keep your favourites close. Arrange your books into collections that feel like you, and let your shelf tell your story.",
      screen: "Your bookshelf",
      alt: "A Bookkin profile with favourite books and personal bookshelf collections using sample content.",
      photoAlt: "A reader browsing Bookkin in a sunlit neighbourhood bookshop.",
    },
    {
      tab: "Find your people",
      title: "Good books.\nBetter company.",
      text: "Visit another reader’s shelf. Discover a shared favourite, follow a new perspective and keep the conversation going.",
      screen: "Meet fellow readers",
      alt: "Bookkin reader discovery showing sample readers and their favourite books.",
      photoAlt:
        "Two readers share a book and a discovery on their phone at a bookshop table.",
    },
  ],
  view: "Explore the app screen",
  actual: "Actual Bookkin interface · sample content",
  startTitle: "Your next chapter\nstarts here.",
  steps: [
    {
      title: "Get Bookkin",
      text: "Download on Google Play or open the web app.",
    },
    {
      title: "Make yourself at home",
      text: "Sign in with Google or email. New accounts currently need a referral code, or you can join the waitlist.",
    },
    {
      title: "Bring your books",
      text: "Add your first book, build a shelf and discover readers through the books you share.",
    },
  ],
  downloadTitle: "A home for your books.\nA place for you.",
  downloadText: "Keep a little bookshop in your pocket.",
  qr: "Scan to get Bookkin on Google Play",
  qrAlt: "QR code linking directly to Bookkin on Google Play.",
  faqTitle: "Before you turn the page.",
  faqs: [
    {
      question: "Where can I use Bookkin?",
      answer:
        "Bookkin is available on Google Play for Android. You can also use the web app on your phone, tablet or computer.",
    },
    {
      question: "How do I join?",
      answer:
        "Sign in with Google or email. New accounts currently need a referral code. If you do not have one, join the waitlist after signing in and we will email you when an invitation is available.",
    },
    {
      question: "How do I add my books?",
      answer:
        "Scan a book cover or book spines, or enter the details yourself. Review and edit the results before saving. Arrange your saved books into your own collections.",
    },
    {
      question: "What can other readers see?",
      answer:
        "Books you save to your bookshelf are public, and public books have a shared discussion card in Home. Adding a book does not publish a personal post. You choose when to publish your own photos and thoughts.",
    },
  ],
  close: "Close preview",
  original: "Open full-size image",
  previewNav: "Choose an app screen",
  loading: "Loading screen…",
  loadError:
    "Could not load the screen. Open the full-size image to try again.",
  footer: "Find a book. Find a little of yourself.",
  top: "Back to top",
  contact: "Contact",
  documents: {
    legal: "Legal",
    support: "Support",
    updated: "Last updated",
    contents: "On this page",
    related: "Related pages",
    relatedMenu: "Legal and support pages",
    operator: "Onepile Tech Limited · Hong Kong",
    openSupport: "Open Help & support",
    openDeletion: "Sign in to request deletion",
    checkTitle: "Already requested deletion?",
    checkText:
      "Keep your receipt code. You can check the progress of a deletion request without signing in.",
    checkLink: "Check a receipt code",
    footer: {
      privacy: "Privacy",
      terms: "Terms",
      community: "Community & child safety",
      support: "Help & support",
      "delete-account": "Delete account",
    },
  },
  credit: "Editorial scenes created with AI. App previews use sample content.",
  trademark:
    "Google Play and the Google Play logo are trademarks of Google LLC.",
  notFound: "This page has slipped off the shelf.",
  home: "Back to Bookkin",
};
type Copy = typeof en;
const hant: Copy = {
  title: "Bookkin 閱見 — 從一本書，遇見同好",
  description:
    "給喜歡的書一個家，也遇見同樣愛書的人。掃描書籍、整理個人書架，從閱讀認識同好。",
  nav: ["探索書架", "開始使用", "下載 Bookkin"],
  skip: "跳至主要內容",
  menu: "選單",
  language: "語言",
  device: "跟隨裝置語言",
  themeLight: "切換至淺色模式",
  themeDark: "切換至深色模式",
  hero: {
    eyebrow: "你的書本，你的同好",
    lines: ["從一本書，", "遇見", "同好。"],
    text: "給喜歡的書一個小天地，\n也給同樣愛書的人一個相遇的地方。",
  },
  play: "在 Google Play 下載 Bookkin",
  photoAlt: "一位讀者在香港街坊書店的陽光書架旁使用手機。",
  photoCaption: "下一頁，也許就是一次相遇。",
  tourTitle: "每個書架，\n都有故事。",
  tourIntro: "從一本喜歡的書開始，看看會遇見誰。",
  chapters: [
    {
      tab: "掃描書籍",
      title: "從手中的書，\n到自己的書架。",
      text: "掃描封面或一排書脊，核對、修改書籍資料，再選擇想加入書架的書。",
      screen: "核對掃描結果",
      alt: "Bookkin 掃描結果核對畫面，展示儲存前可編輯的示範書籍。",
      photoAlt: "一位讀者將手機鏡頭對準書脊，螢幕顯示 Bookkin。",
    },
    {
      tab: "整理書架",
      title: "為喜歡的書，\n留一個位置。",
      text: "把心愛的書放在手邊，按自己的方式建立收藏。讓每一層書架，慢慢拼出你的模樣。",
      screen: "我的書架",
      alt: "Bookkin 個人檔案，以示範內容展示喜愛的書籍和個人收藏。",
      photoAlt: "一位讀者在灑滿陽光的街坊書店瀏覽 Bookkin。",
    },
    {
      tab: "遇見同好",
      title: "好書，\n也有好伴。",
      text: "逛逛另一位讀者的書架，發現共同喜歡的一本書。追蹤讓你有新想法的人，讓交流繼續。",
      screen: "認識讀書同好",
      alt: "Bookkin 同好頁面，展示示範讀者及他們喜愛的書籍。",
      photoAlt: "兩位讀者在書店的木桌旁，一起分享書籍和手機上的新發現。",
    },
  ],
  view: "看看完整介面",
  actual: "實際 Bookkin 介面 · 示範內容",
  startTitle: "你的下一章，\n從這裏開始。",
  steps: [
    { title: "開啟 Bookkin", text: "在 Google Play 下載，或直接開啟網頁版。" },
    {
      title: "找到你的位置",
      text: "使用 Google 或電郵登入。新帳戶目前需要推薦碼，也可以先加入候補名單。",
    },
    {
      title: "帶上你的書",
      text: "加入第一本書，整理個人書架，從共同喜歡的書認識同好。",
    },
  ],
  downloadTitle: "書本的家，\n也是你的天地。",
  downloadText: "把一間小書店，放進口袋裏。",
  qr: "掃描二維碼，在 Google Play 下載 Bookkin",
  qrAlt: "直接連往 Bookkin Google Play 頁面的二維碼。",
  faqTitle: "翻頁之前，你可能想知道。",
  faqs: [
    {
      question: "在哪裏可以使用 Bookkin？",
      answer:
        "Android 用戶可以在 Google Play 下載 Bookkin。你也可以用手機、平板或電腦的瀏覽器開啟網頁版。",
    },
    {
      question: "怎樣加入？",
      answer:
        "使用 Google 或電郵登入。新帳戶目前需要推薦碼；如果未有推薦碼，可以在登入後加入候補名單。有邀請名額時，我們會以電郵通知你。",
    },
    {
      question: "怎樣把書加入書架？",
      answer:
        "掃描封面或書脊，或手動輸入書籍資料。核對和修改結果後再儲存，然後按自己的方式整理成不同收藏。",
    },
    {
      question: "其他讀者可以看到甚麼？",
      answer:
        "儲存到書架的書籍是公開的，公開書籍在首頁也有共同的討論卡片。加入書籍不會發佈個人貼文。你可以自行選擇何時發佈照片和閱讀心得。",
    },
  ],
  close: "關閉預覽",
  original: "開啟完整原圖",
  previewNav: "選擇要預覽的介面",
  loading: "正在載入介面…",
  loadError: "未能載入介面，請開啟完整原圖重試。",
  footer: "找到一本書，也找到一點自己。",
  top: "返回頂部",
  contact: "聯絡我們",
  documents: {
    legal: "法律文件",
    support: "支援",
    updated: "最後更新",
    contents: "本頁內容",
    related: "相關頁面",
    relatedMenu: "法律及支援頁面",
    operator: "Onepile Tech Limited · 香港",
    openSupport: "開啟幫助及支援",
    openDeletion: "登入並要求刪除",
    checkTitle: "已要求刪除帳戶？",
    checkText: "請保留刪除收據。毋須登入，也可查詢刪除要求的進度。",
    checkLink: "查詢收據代碼",
    footer: {
      privacy: "私隱政策",
      terms: "使用條款",
      community: "社群與兒童安全",
      support: "幫助及支援",
      "delete-account": "刪除帳戶",
    },
  },
  credit: "情境照片由 AI 創作。介面預覽使用示範內容。",
  trademark: "Google Play 和 Google Play 標誌為 Google LLC 的商標。",
  notFound: "這一頁，好像從書架上溜走了。",
  home: "返回 Bookkin",
};
const hans: Copy = {
  title: "Bookkin 阅见 — 从一本书，遇见同好",
  description:
    "给喜欢的书一个家，也遇见同样爱书的人。扫描书籍、整理个人书架，从阅读认识同好。",
  nav: ["探索书架", "开始使用", "下载 Bookkin"],
  skip: "跳至主要内容",
  menu: "菜单",
  language: "语言",
  device: "跟随设备语言",
  themeLight: "切换至浅色模式",
  themeDark: "切换至深色模式",
  hero: {
    eyebrow: "你的书本，你的同好",
    lines: ["从一本书，", "遇见", "同好。"],
    text: "给喜欢的书一个小天地，\n也给同样爱书的人一个相遇的地方。",
  },
  play: "在 Google Play 下载 Bookkin",
  photoAlt: "一位读者在香港街坊书店的阳光书架旁使用手机。",
  photoCaption: "下一页，也许就是一次相遇。",
  tourTitle: "每个书架，\n都有故事。",
  tourIntro: "从一本喜欢的书开始，看看会遇见谁。",
  chapters: [
    {
      tab: "扫描书籍",
      title: "从手中的书，\n到自己的书架。",
      text: "扫描封面或一排书脊，核对、修改书籍信息，再选择想加入书架的书。",
      screen: "核对扫描结果",
      alt: "Bookkin 扫描结果核对界面，展示保存前可编辑的示范书籍。",
      photoAlt: "一位读者将手机镜头对准书脊，屏幕显示 Bookkin。",
    },
    {
      tab: "整理书架",
      title: "为喜欢的书，\n留一个位置。",
      text: "把心爱的书放在手边，按自己的方式建立收藏。让每一层书架，慢慢拼出你的模样。",
      screen: "我的书架",
      alt: "Bookkin 个人资料，以示范内容展示喜爱的书籍和个人收藏。",
      photoAlt: "一位读者在洒满阳光的街坊书店浏览 Bookkin。",
    },
    {
      tab: "遇见同好",
      title: "好书，\n也有好伴。",
      text: "逛逛另一位读者的书架，发现共同喜欢的一本书。关注让你有新想法的人，让交流继续。",
      screen: "认识读书同好",
      alt: "Bookkin 同好页面，展示示范读者及他们喜爱的书籍。",
      photoAlt: "两位读者在书店的木桌旁，一起分享书籍和手机上的新发现。",
    },
  ],
  view: "看看完整界面",
  actual: "实际 Bookkin 界面 · 示范内容",
  startTitle: "你的下一章，\n从这里开始。",
  steps: [
    { title: "打开 Bookkin", text: "在 Google Play 下载，或直接打开网页版。" },
    {
      title: "找到你的位置",
      text: "使用 Google 或邮箱登录。新账户目前需要推荐码，也可以先加入候补名单。",
    },
    {
      title: "带上你的书",
      text: "加入第一本书，整理个人书架，从共同喜欢的书认识同好。",
    },
  ],
  downloadTitle: "书本的家，\n也是你的天地。",
  downloadText: "把一间小书店，放进口袋里。",
  qr: "扫描二维码，在 Google Play 下载 Bookkin",
  qrAlt: "直接前往 Bookkin Google Play 页面的二维码。",
  faqTitle: "翻页之前，你可能想知道。",
  faqs: [
    {
      question: "在哪里可以使用 Bookkin？",
      answer:
        "Android 用户可以在 Google Play 下载 Bookkin。你也可以用手机、平板或电脑的浏览器打开网页版。",
    },
    {
      question: "怎样加入？",
      answer:
        "使用 Google 或邮箱登录。新账户目前需要推荐码；如果还没有推荐码，可以在登录后加入候补名单。有邀请名额时，我们会通过邮件通知你。",
    },
    {
      question: "怎样把书加入书架？",
      answer:
        "扫描封面或书脊，或手动输入书籍信息。核对和修改结果后再保存，然后按自己的方式整理成不同收藏。",
    },
    {
      question: "其他读者可以看到什么？",
      answer:
        "保存到书架的书籍是公开的，公开书籍在首页也有共同的讨论卡片。加入书籍不会发布个人帖子。你可以自行选择何时发布照片和阅读心得。",
    },
  ],
  close: "关闭预览",
  original: "打开完整原图",
  previewNav: "选择要预览的界面",
  loading: "正在加载界面…",
  loadError: "未能加载界面，请打开完整原图重试。",
  footer: "找到一本书，也找到一点自己。",
  top: "返回顶部",
  contact: "联系我们",
  documents: {
    legal: "法律文件",
    support: "支持",
    updated: "最后更新",
    contents: "本页内容",
    related: "相关页面",
    relatedMenu: "法律及支持页面",
    operator: "Onepile Tech Limited · 香港",
    openSupport: "打开帮助与支持",
    openDeletion: "登录并申请删除",
    checkTitle: "已申请删除账户？",
    checkText: "请保留删除回执。无需登录，也可查询删除请求的进度。",
    checkLink: "查询回执码",
    footer: {
      privacy: "隐私政策",
      terms: "使用条款",
      community: "社群与儿童安全",
      support: "帮助与支持",
      "delete-account": "删除账户",
    },
  },
  credit: "情境照片由 AI 创作。界面预览使用示范内容。",
  trademark: "Google Play 和 Google Play 标志为 Google LLC 的商标。",
  notFound: "这一页，好像从书架上溜走了。",
  home: "返回 Bookkin",
};
export const translations: Record<Locale, Copy> = {
  en,
  "zh-Hant": hant,
  "zh-Hans": hans,
};
