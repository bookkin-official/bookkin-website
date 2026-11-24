import type { Locale } from "./home";

// Policy and support pages. English and Traditional Chinese keep the wording of
// the previous pages on the app origin. Simplified Chinese is preserved there
// only for privacy (invitations, book-photos, screening) and terms (premium,
// renewal-cancellation-refunds); every other Simplified paragraph was written
// from the Traditional edition on 24 November 2026, when the pages moved here.

export const documentKeys = [
  "privacy",
  "terms",
  "community",
  "support",
  "delete-account",
] as const;
export type DocumentKey = (typeof documentKeys)[number];

// Shared by every edition, so a section link survives a language change.
export const sectionIds = {
  privacy: [
    "account",
    "invitations",
    "visibility",
    "book-photos",
    "screening",
    "qr-scanning",
    "reading-quiz",
    "kin",
    "notifications",
    "providers",
    "retention",
  ],
  terms: [
    "eligibility",
    "content-and-safety",
    "selling-books",
    "premium",
    "renewal-cancellation-refunds",
    "your-rights",
  ],
  community: ["standards", "protect-younger-readers", "report-block-contact"],
  support: ["with-or-without-account", "inside-the-app"],
  "delete-account": [
    "request-on-the-web",
    "what-happens-next",
    "data-removed-and-retained",
  ],
} as const;
export type SectionCopy = { heading: string; paragraphs: readonly string[] };
type Edition<K extends DocumentKey> = {
  title: string;
  summary: string;
  updated: string;
  contact: string;
  sections: { [Id in (typeof sectionIds)[K][number]]: SectionCopy };
};
export type Document<K extends DocumentKey> = {
  // Latest wording change, for <time datetime>.
  date: string;
  locales: Record<Locale, Edition<K>>;
  // Value of the web app's account_action query, when the page opens the app.
  action?: "support" | "delete";
  related: readonly DocumentKey[];
};
export const documents: { [K in DocumentKey]: Document<K> } = {
  privacy: {
    date: "2026-11-19",
    related: ["terms", "community", "delete-account"],
    locales: {
      en: {
        title: "Privacy policy",
        summary:
          "How Bookkin handles your information: what is collected, why it is used and the choices you have.",
        updated: "19 November 2026",
        contact: "Email Bookkin",
        sections: {
          account: {
            heading: "Your account",
            paragraphs: [
              "Onepile Tech Limited in Hong Kong operates Bookkin. We use your email, sign-in provider identifier or password hash, profile name and photo, private date of birth or age eligibility and optional adult contact details to run and protect your account. Your age, birth date and phone number are private. Account and session records, activity and rate limits help us keep the service secure.",
            ],
          },
          invitations: {
            heading: "Invitations and waitlist",
            paragraphs: [
              "Bookkin stores your invitation codes, the source of a redeemed code, access and waitlist status, account email, language and mail-delivery records to manage invitations. Authorized staff can review the waitlist and send invitations. Our account-email provider receives your address and the confirmation or invitation message, including an account-specific invitation code when needed. You can choose to share your own reusable code. Codes and invitation links between accounts are not published on profiles. Deleting your account removes your referral, waitlist and mail-job records and unlinks your codes from other readers, who keep their existing access. Copies held by email providers and in backups follow separate retention. Joining the waitlist does not yet grant app access.",
            ],
          },
          visibility: {
            heading: "What people can see",
            paragraphs: [
              "People without a Bookkin account can see published posts, reader summaries and limited previews of public books and shelves on the website. Signed-in access is required for full shelves, comments and interactions. Shop and private messaging are for adults aged 18 or over. Your posts, photos, likes, saves, follows, blocks, reports and preferences support community features and discovery. Teen readers’ lists of liked and saved posts start hidden. Messages are for participants. Reporting a message sends the selected excerpt to staff.",
            ],
          },
          "book-photos": {
            heading: "Book photos and catalogue searches",
            paragraphs: [
              "Bookkin requests camera or photo access when you scan or select a photo. Before book recognition or photo-cover preparation, the app separately asks you to agree to provider processing; cancelling does not send the photo for that action. An agreed book, shelf or cover photo can be processed even if you never publish it. Where image screening is enabled, Google Cloud Vision SafeSearch checks the original photo before automatic book recognition, cover location or artwork matching. DeepSeek can read a prepared cover to match it to your book. Bookkin processes manual crop previews on its own server. You can add a book manually without a photo. To find book details and covers we look up titles, authors or ISBNs with Google Books, Open Library and publisher sources. Cover matching can use DeepSeek search, page retrieval and image analysis. When enabled, Serper also receives search phrases derived from book titles, authors or ISBNs to find pages and images; these requests do not include your account identifiers or uploaded photos. Review the results before saving books to your public shelf.",
            ],
          },
          screening: {
            heading: "Screening public uploads",
            paragraphs: [
              "For proposed public uploads such as profile, post and listing photos, Bookkin can send images to Google Cloud Vision SafeSearch for safety checks. Ordinary profile, post, listing and bookshelf text can publish immediately. Bookkin staff review text flagged as a direct threat and reader reports. Post and listing photos stay private until publication. New scanned books publish when you confirm them. Book covers, including reader uploads, follow the book’s visibility. You can report a cover on the public book page. Reader comments and replies publish immediately and can be reported. Written fields such as bios, captions and comments are not sent to Google for this check. Staff can review held images. If the photo check could not finish, you can retry the same submission.",
            ],
          },
          "qr-scanning": {
            heading: "Profile QR scanning",
            paragraphs: [
              "Profile QR codes are separate from book scans. On Android, Google ML Kit reads the QR code on the device. It does not send the camera image or decoded value to Google for recognition. The SDK sends Google usage and diagnostic data, including app and device information, an installation identifier, timing and errors. On iOS the scanner uses Apple Vision. Bookkin uses a recognized profile reference to open that reader’s public profile.",
            ],
          },
          "reading-quiz": {
            heading: "Your reading quiz and constellation",
            paragraphs: [
              "The app asks for your agreement before generating quiz questions, writing or retrying an interpretation, or creating a reflection in another language. Opening saved questions or results, or changing the interface language, does not itself request AI writing. For personalized quiz questions, DeepSeek can receive book titles, authors and categories. Reading reflections use reading preferences and aggregate shelf topics. A private constellation reflection can also use date-derived sky references. Your reading type, written reflection and preference percentages appear on your public profile by default, including for teen readers. People without an account can see this result. Turn it off in Privacy & discovery to remove the public result and revoke its share links. Quiz answers, your birth date and your full book list are excluded from the public result.",
            ],
          },
          kin: {
            heading: "Kin, the optional AI reading companion",
            paragraphs: [
              "Kin starts after you agree in the app. DeepSeek can receive what you type, recent chat and its short memory, shelf titles and authors, book alerts, reading type and selected reading or constellation text. Bookkin excludes your birth date, sky chart and private quiz answers. Messages flagged by the crisis filter receive a local response and are excluded from the AI request. When staff chat is enabled, authorised Bookkin staff can read your saved Kin conversation in JOHN CRM and reply as the Bookkin team. Kin can use your question to search Bookkin’s customer knowledge in JOHN CRM. Messages marked private by the crisis filter stay out of the staff inbox and this search. When staff take over, Kin pauses. DeepSeek can help staff assess when to resume. Kin can make mistakes. You can report an AI reply, clear your chat and memory, or turn Kin off. Daily usage counts are kept separately from the chat.",
            ],
          },
          notifications: {
            heading: "Notifications",
            paragraphs: [
              "Where adult web check-ins are enabled, you can opt in or turn them off. Bookkin stores the push subscription endpoint and keys, language and time-zone offset. Your browser’s push provider (such as Apple, Google, Microsoft or Mozilla) delivers an encrypted, generic notification up to twice a week. The notification contains no book titles.",
            ],
          },
          providers: {
            heading: "Other providers and overseas processing",
            paragraphs: [
              "Bookkin runs the service and database on its own server. Cloudflare carries web traffic to it. On Bookkin web pages, your browser can send page-load performance measurements to Cloudflare so we can understand how the website performs. Google and Apple handle their respective sign-ins. Resend delivers account emails. Google processes email sent to our public support mailbox. Stripe processes web Premium payments and invoices. Bookkin stores customer and subscription identifiers, confirmed payment status and dates, and does not receive full card numbers. Native apps only show membership status. These providers may process data outside Hong Kong.",
            ],
          },
          retention: {
            heading: "Retention and your choices",
            paragraphs: [
              "Request access, correction or deletion through support. Account deletion removes owned personal data, media, Kin chats and memory. Other readers’ content, shared catalogue records and some anonymized replies or delivered messages can remain. Staff may retain necessary safety, audit and financial records. Routine encrypted backups rotate over seven daily copies and three pre-deployment copies. Separately kept migration and recovery copies do not follow that rotation. Deletion from the active service does not immediately erase backups or records a provider retains. Contact us about a specific record or retention period.",
            ],
          },
        },
      },
      "zh-Hant": {
        title: "私隱政策",
        summary:
          "Bookkin 如何處理你的資料：收集甚麼、用途為何，以及你可作出的選擇。",
        updated: "2026 年 11 月 19 日",
        contact: "電郵 Bookkin",
        sections: {
          account: {
            heading: "你的帳戶",
            paragraphs: [
              "Bookkin 由香港的 Onepile Tech Limited 營運。我們使用你的電郵、登入供應商識別碼或密碼雜湊值、個人檔案名稱及相片、私人出生日期或年齡資格，以及成年讀者可選填的聯絡資料，來管理及保護帳戶。年齡、出生日期及電話號碼屬私人資料。帳戶、登入階段、使用活動及流量限制紀錄有助維護服務安全。",
            ],
          },
          invitations: {
            heading: "邀請與候補名單",
            paragraphs: [
              "Bookkin 會儲存你的邀請碼、已使用邀請碼的來源、使用資格及候補狀態、帳戶電郵、語言及郵件傳送紀錄，以管理邀請。獲授權職員可查看候補名單並發出邀請。帳戶電郵供應商會收到你的地址及確認或邀請內容，必要時包括帳戶專用邀請碼。你可自行分享個人的長期邀請碼。邀請碼及帳戶之間的邀請關係不會顯示於公開個人檔案。刪除帳戶會移除你的邀請、候補及郵件工作紀錄，並解除你的邀請碼與其他讀者的連結；其他讀者仍保留已取得的使用資格。電郵供應商及備份中的副本有獨立的保留安排。加入候補名單暫不代表已取得應用程式使用資格。",
            ],
          },
          visibility: {
            heading: "誰可查看哪些資料",
            paragraphs: [
              "毋須 Bookkin 帳戶也可在網站閱讀已發佈的帖子、讀者簡介，以及公開書籍和書架的部分預覽。查看完整書架、留言及互動需要登入。商店及私人訊息僅供年滿 18 歲的讀者使用。我們使用帖子、相片、讚好、收藏、追蹤、封鎖、檢舉及偏好資料提供社群和探索功能。青少年讚好及收藏的帖子清單預設為隱藏。私人訊息供對話參與者閱讀；檢舉訊息時，所選訊息的摘錄會交予職員。",
            ],
          },
          "book-photos": {
            heading: "掃描相片與書目搜尋",
            paragraphs: [
              "掃描或選取相片時，Bookkin 會要求使用相機或相片。辨識書籍或準備相片封面前，應用程式會另行徵求你同意供應商處理；取消後不會為本次操作傳送相片。你同意處理的書籍、書架或封面相片，即使最後沒有公開，也可能經服務處理。啟用圖片篩查時，Google Cloud Vision SafeSearch 會在自動辨識書籍、定位或配對封面前檢查原始相片。DeepSeek 可讀取已裁剪的封面，以核對書籍。你可手動新增書籍，毋須提供相片。我們以書名、作者或 ISBN 向 Google 圖書、Open Library 及出版社查找書籍資料和封面。配對封面時亦可能使用 DeepSeek 搜尋、擷取網頁及分析圖片。啟用 Serper 搜尋時，我們亦會把由書名、作者或 ISBN 組成的搜尋字句傳送給 Serper，以尋找網頁及圖片；這些請求不包含你的帳戶識別碼或上載相片。請核對結果，再將書籍儲存到公開書架。手動裁剪預覽由 Bookkin 自己的伺服器處理。",
            ],
          },
          screening: {
            heading: "公開上載內容的審核",
            paragraphs: [
              "Bookkin 可能會把擬公開上載的個人檔案、帖子或刊登相片傳送至 Google Cloud Vision SafeSearch 作安全檢查。一般個人檔案、帖子、刊登及書架文字可即時發佈。Bookkin 職員會審核被標記為直接威脅的文字及讀者檢舉。帖子及刊登相片在發佈前只供本人查看。新掃描的書籍經你確認後便會公開。書封隨書籍的公開狀態展示，包括讀者上載的封面。你可在公開書籍頁舉報封面。讀者留言及回覆會即時發佈，讀者可以檢舉。個人簡介、相片說明及留言等文字欄位不會為此項檢查而傳送給 Google。職員可審核暫緩發佈的圖片。如相片檢查未能完成，你可以重新提交同一項變更。",
            ],
          },
          "qr-scanning": {
            heading: "掃描個人檔案 QR 碼",
            paragraphs: [
              "個人檔案 QR 碼與書籍掃描是兩項不同的功能。在 Android 上，Google ML Kit 會在裝置上讀取 QR 碼，辨識時不會把相機影像或解碼結果傳送給 Google。這個工具會向 Google 傳送使用及診斷資料，包括應用程式與裝置資料、安裝識別碼、處理時間及錯誤。iOS 版本使用 Apple Vision。Bookkin 會使用識別到的個人檔案連結開啟該讀者的公開個人檔案。",
            ],
          },
          "reading-quiz": {
            heading: "閱讀測驗與閱讀星圖",
            paragraphs: [
              "產生測驗題目、撰寫或重試解讀，以及以另一語言撰寫閱讀感想前，應用程式會徵求你的同意。開啟已儲存的題目或結果，或切換介面語言，本身不會要求 AI 撰寫。產生個人化測驗題目時，DeepSeek 可能會收到書名、作者及分類。閱讀感想會運用閱讀偏好及書架主題的整體資料；私人閱讀星圖感想也可使用按日期推算的星象資料。所有讀者（包括青少年）的閱讀類型、文字感想及偏好百分比預設會顯示於公開個人檔案，沒有帳戶的人也能查看。在「私隱與探索」關閉分享，即可移除公開結果，並撤銷結果的分享連結。公開結果不會列出測驗答案、出生日期或完整書單。",
            ],
          },
          kin: {
            heading: "自選 AI 閱讀夥伴 Kin",
            paragraphs: [
              "你在應用程式內同意後才會啟用 Kin。DeepSeek 可能會收到你輸入的內容、近期對話及其簡短記憶、書架上的書名和作者、書籍提醒、閱讀類型及部分閱讀或星圖文字。Bookkin 不會傳送你的出生日期、星盤或私人測驗答案。被危機篩選機制識別的訊息會由 Bookkin 直接回應，不會加入 AI 請求。啟用職員聊天後，獲授權的 Bookkin 職員可以在 JOHN CRM 查看你已儲存的 Kin 對話，並以「Bookkin 團隊」的名義回覆。Kin 可以用你的問題在 JOHN CRM 搜尋供讀者查閱的 Bookkin 資料。危機篩選機制標為私密的訊息不會出現在職員收件匣，也不會用於這項搜尋。職員接手時，Kin 會暫停回覆。DeepSeek 可以協助職員評估何時恢復 AI 回覆。Kin 的回答可能有誤。你可檢舉 AI 回覆、清除聊天及記憶，或關閉 Kin。每日使用量與聊天紀錄分開保存。",
            ],
          },
          notifications: {
            heading: "通知",
            paragraphs: [
              "當網頁版向成年讀者提供問候通知時，你可自行開啟或關閉。Bookkin 會儲存推送訂閱的端點、金鑰、語言和時區偏移。瀏覽器的推送供應商（例如 Apple、Google、Microsoft 或 Mozilla）每星期最多傳送兩次加密的通用通知，通知內容不含書名。",
            ],
          },
          providers: {
            heading: "其他服務供應商及境外處理",
            paragraphs: [
              "Bookkin 在自設伺服器運行服務及資料庫，由 Cloudflare 傳送網絡流量。瀏覽 Bookkin 網頁時，你的瀏覽器可能會向 Cloudflare 傳送頁面載入效能數據，協助我們了解網站的運行情況。Google 與 Apple 分別處理其登入服務，Resend 負責寄送帳戶電郵，Google 處理寄往公開支援信箱的電郵。Stripe 處理網頁版 Premium 付款及帳單，Bookkin 會儲存客戶與訂閱識別碼、已確認的付款狀態及日期，不會收到完整信用卡號碼。原生應用程式只顯示會員狀態。這些供應商可能在香港境外處理資料。",
            ],
          },
          retention: {
            heading: "保留資料與你的選擇",
            paragraphs: [
              "你可透過支援要求查閱、更正或刪除資料。刪除帳戶後，帳戶的個人資料、媒體、Kin 對話及記憶會被移除。其他讀者的內容、共用書目，以及部分已匿名的回覆或已送達的訊息可能保留。必要的安全、審計及財務紀錄亦可能保留。定期加密備份輪流保留七份每日備份及三份部署前備份；另外保存的遷移及復原副本並不按這個週期輪替。從使用中的服務刪除資料後，備份或供應商保留的紀錄不會同時消失。若想查詢特定紀錄或保留期限，請聯絡我們。",
            ],
          },
        },
      },
      "zh-Hans": {
        title: "隐私政策",
        summary:
          "Bookkin 如何处理你的信息：收集什么、用途为何，以及你可以作出的选择。",
        updated: "2026 年 11 月 19 日",
        contact: "邮件联系 Bookkin",
        sections: {
          account: {
            heading: "你的账户",
            paragraphs: [
              "Bookkin 由香港的 Onepile Tech Limited 运营。我们使用你的邮箱、登录提供商标识符或密码哈希值、个人资料名称及照片、私人出生日期或年龄资格，以及成年读者可选填的联系信息，来管理及保护账户。年龄、出生日期及电话号码均为私密信息。账户、登录会话、使用活动及流量限制记录有助于维护服务安全。",
            ],
          },
          invitations: {
            heading: "邀请与候补名单",
            paragraphs: [
              "Bookkin 会存储你的邀请码、已使用邀请码的来源、使用资格和候补状态、账户邮箱、语言及邮件发送记录，以管理邀请。获授权工作人员可查看候补名单并发出邀请。账户邮件提供商会收到你的地址及确认或邀请内容，必要时包括账户专用邀请码。你可自行分享个人的长期邀请码。邀请码及账户之间的邀请关系不会显示在公开个人资料中。删除账户会移除你的邀请、候补及邮件任务记录，并解除你的邀请码与其他读者的关联；其他读者仍保留已取得的使用资格。邮件提供商及备份中的副本有单独的保留安排。加入候补名单暂不代表已取得应用使用资格。",
            ],
          },
          visibility: {
            heading: "谁可以查看哪些信息",
            paragraphs: [
              "无需 Bookkin 账户也可在网站阅读已发布的帖子、读者简介，以及公开书籍和书架的部分预览。查看完整书架、评论及互动需要登录。商店及私信仅供年满 18 岁的读者使用。我们使用帖子、照片、点赞、收藏、关注、屏蔽、举报及偏好信息来提供社区和探索功能。青少年点赞及收藏的帖子列表默认为隐藏。私信供对话参与者阅读；举报私信时，所选私信的摘录会交给工作人员。",
            ],
          },
          "book-photos": {
            heading: "扫描照片与书目搜索",
            paragraphs: [
              "扫描或选择照片时，Bookkin 会请求使用相机或照片。识别书籍或准备照片封面前，应用会另行征求你同意提供商处理；取消后不会为本次操作发送照片。你同意处理的书籍、书架或封面照片，即使最后没有公开，也可能经服务处理。启用图片筛查时，Google Cloud Vision SafeSearch 会在自动识别书籍、定位或匹配封面前检查原始照片。DeepSeek 可读取已裁剪的封面，以核对书籍。你可手动添加书籍，无需提供照片。我们以书名、作者或 ISBN 向 Google 图书、Open Library 及出版社查找书籍资料和封面。匹配封面时也可能使用 DeepSeek 搜索、获取网页及分析图片。启用 Serper 搜索时，我们也会把由书名、作者或 ISBN 组成的搜索词句发送给 Serper，以寻找网页及图片；这些请求不包含你的账户标识符或上传照片。请核对结果，再将书籍保存到公开书架。手动裁剪预览由 Bookkin 自己的服务器处理。",
            ],
          },
          screening: {
            heading: "公开上传内容的审核",
            paragraphs: [
              "Bookkin 可能会把拟公开上传的个人资料、帖子或商品照片发送至 Google Cloud Vision SafeSearch 进行安全检查。普通个人资料、帖子、商品和书架文字可立即发布。Bookkin 工作人员会审核被标记为直接威胁的文字及读者举报。帖子和商品照片在发布前仅自己可见。新扫描的书籍经你确认后即会公开。书封随书籍的公开状态展示，包括读者上传的封面。你可在公开书籍页举报封面。读者评论和回复会立即发布，读者可以举报。个人简介、照片说明及评论等文字字段不会为此项检查发送给 Google。工作人员可审核暂缓发布的图片。如果照片检查未能完成，你可以重新提交同一项更改。",
            ],
          },
          "qr-scanning": {
            heading: "扫描个人资料二维码",
            paragraphs: [
              "个人资料二维码与书籍扫描是两项不同的功能。在 Android 上，Google ML Kit 会在设备上读取二维码，识别时不会把相机图像或解码结果发送给 Google。该工具会向 Google 发送使用及诊断数据，包括应用与设备信息、安装标识符、处理时间及错误。iOS 版本使用 Apple Vision。Bookkin 会使用识别到的个人资料链接打开该读者的公开个人资料。",
            ],
          },
          "reading-quiz": {
            heading: "阅读测验与阅读星图",
            paragraphs: [
              "在生成测验题目、撰写或重试解读，以及用另一种语言撰写阅读感想之前，应用会征求你的同意。打开已保存的题目或结果，或切换界面语言，本身不会请求 AI 撰写。生成个性化测验题目时，DeepSeek 可能会收到书名、作者及分类。阅读感想会使用阅读偏好及书架主题的整体信息；私人阅读星图感想也可使用按日期推算的星象数据。所有读者（包括青少年）的阅读类型、文字感想及偏好百分比默认会显示在公开个人资料中，没有账户的人也能查看。在「隐私与探索」中关闭分享，即可移除公开结果，并撤销结果的分享链接。公开结果不会列出测验答案、出生日期或完整书单。",
            ],
          },
          kin: {
            heading: "自选 AI 阅读伙伴 Kin",
            paragraphs: [
              "你在应用内同意后才会启用 Kin。DeepSeek 可能会收到你输入的内容、近期对话及其简短记忆、书架上的书名和作者、书籍提醒、阅读类型及部分阅读或星图文字。Bookkin 不会发送你的出生日期、星盘或私人测验答案。被危机筛选机制识别的消息会由 Bookkin 直接回应，不会加入 AI 请求。启用人工服务后，经授权的 Bookkin 工作人员可以在 JOHN CRM 查看你已保存的 Kin 对话，并以「Bookkin 团队」的名义回复。Kin 可以用你的问题在 JOHN CRM 中搜索供读者查阅的 Bookkin 资料。被危机筛选机制标为私密的消息不会出现在工作人员收件箱，也不会用于这项搜索。工作人员接手时，Kin 会暂停回复。DeepSeek 可以帮助工作人员评估何时恢复 AI 回复。Kin 的回答可能有误。你可以举报 AI 回复、清除聊天及记忆，或关闭 Kin。每日使用量与聊天记录分开保存。",
            ],
          },
          notifications: {
            heading: "通知",
            paragraphs: [
              "当网页版向成年读者提供问候通知时，你可自行开启或关闭。Bookkin 会保存推送订阅的端点、密钥、语言和时区偏移。浏览器的推送提供商（例如 Apple、Google、Microsoft 或 Mozilla）每周最多发送两次加密的通用通知，通知内容不含书名。",
            ],
          },
          providers: {
            heading: "其他服务提供商及境外处理",
            paragraphs: [
              "Bookkin 在自设服务器上运行服务及数据库，由 Cloudflare 传输网络流量。浏览 Bookkin 网页时，你的浏览器可能会向 Cloudflare 发送页面加载性能数据，帮助我们了解网站的运行情况。Google 与 Apple 分别处理其登录服务，Resend 负责发送账户邮件，Google 处理发往公开客服邮箱的邮件。Stripe 处理网页版 Premium 付款及账单，Bookkin 会保存客户与订阅标识符、已确认的付款状态及日期，不会收到完整的信用卡号码。原生应用只显示会员状态。这些提供商可能在香港以外处理数据。",
            ],
          },
          retention: {
            heading: "数据保留与你的选择",
            paragraphs: [
              "你可以通过客服请求查阅、更正或删除数据。删除账户后，账户的个人资料、媒体、Kin 对话及记忆会被移除。其他读者的内容、共享书目，以及部分已匿名的回复或已送达的消息可能会保留。必要的安全、审计及财务记录也可能会保留。定期加密备份轮流保留七份每日备份及三份部署前备份；另行保存的迁移及恢复副本不按这个周期轮换。从运行中的服务删除数据后，备份或提供商保留的记录不会同时消失。如需查询特定记录或保留期限，请联系我们。",
            ],
          },
        },
      },
    },
  },
  terms: {
    date: "2026-11-02",
    related: ["privacy", "community", "support"],
    locales: {
      en: {
        title: "Terms of use",
        summary:
          "Who can use Bookkin, what you may share, and how Premium subscriptions work.",
        updated: "2 November 2026",
        contact: "Email Bookkin",
        sections: {
          eligibility: {
            heading: "Who can use Bookkin",
            paragraphs: [
              "Onepile Tech Limited operates Bookkin. Accounts are for readers aged 13 or older. Shop and private messaging require age 18 or older. Give accurate eligibility information and contact support to correct a mistake. Public website previews can be read without an account.",
            ],
          },
          "content-and-safety": {
            heading: "Your content and safety",
            paragraphs: [
              "Only upload material you have the right to use. You give Bookkin permission to store, process, display and moderate your contributions to operate the features you choose. Published posts and public books may appear in website previews. Follow our community and child-safety standards. Staff can hold or remove content and restrict accounts. Keep your credentials private and report unauthorized access.",
            ],
          },
          "selling-books": {
            heading: "Selling or giving away books",
            paragraphs: [
              "Adult readers can list physical books for sale or give them away. Check the condition of a book and agree the handover details before proceeding. Do not share payment credentials in messages. Premium is separate from transactions for physical books.",
            ],
          },
          premium: {
            heading: "Bookkin Premium subscriptions",
            paragraphs: [
              "Premium is an optional recurring membership offered on the Bookkin website when checkout is available. Existing free features, including customization, remain free. There is no free trial. The monthly plan is HKD 38. The annual plan is HKD 360 billed once a year, equivalent to HKD 30 per month and HKD 96 less than twelve monthly payments. Stripe Checkout shows the total and billing period before you confirm. Opening checkout alone does not take a payment.",
            ],
          },
          "renewal-cancellation-refunds": {
            heading: "Renewal, cancellation and refunds",
            paragraphs: [
              "Subscriptions renew at the selected price until cancelled. Before renewal, use Membership → Manage subscription to cancel future renewals, update payment details or see invoices. Normal cancellation preserves access through the paid period. Deleting an account ends its subscription during cleanup. Cancellation does not automatically issue a refund. Contact support with the relevant receipt for individual review of a payment error or refund. Do not send full card details. Native apps display membership status and do not sell digital subscriptions.",
            ],
          },
          "your-rights": {
            heading: "Your rights",
            paragraphs: [
              "You can request account deletion. Hong Kong law governs these terms, subject to applicable mandatory rights. These terms preserve rights that cannot lawfully be excluded.",
            ],
          },
        },
      },
      "zh-Hant": {
        title: "使用條款",
        summary:
          "誰可以使用 Bookkin、你可以分享甚麼，以及 Premium 訂閱的安排。",
        updated: "2026 年 11 月 2 日",
        contact: "電郵 Bookkin",
        sections: {
          eligibility: {
            heading: "使用資格",
            paragraphs: [
              "Bookkin 由 Onepile Tech Limited 營運。帳戶供年滿 13 歲的讀者使用。商店及私人訊息僅供年滿 18 歲的讀者使用。請提供正確的年齡資格資料，如有錯誤請聯絡支援。毋須帳戶也可閱讀網站的公開預覽。",
            ],
          },
          "content-and-safety": {
            heading: "你的內容與安全",
            paragraphs: [
              "只上載你有權使用的資料。你授權 Bookkin 為提供所選功能而儲存、處理、展示及審核你的內容。已發佈的帖子和公開書籍可能出現在網站預覽。請遵守社群及兒童安全守則。職員可暫緩發佈、移除內容或限制帳戶。請妥善保管登入資料，並檢舉未經授權的存取。",
            ],
          },
          "selling-books": {
            heading: "出售或贈送實體書籍",
            paragraphs: [
              "成年讀者可刊登實體書籍以供出售或免費贈送。請先確認書況及交易安排。請勿在訊息中透露付款憑證。Premium 會員資格與實體書交易分開。",
            ],
          },
          premium: {
            heading: "Bookkin Premium 會員訂閱",
            paragraphs: [
              "結帳服務可用時，Bookkin 網頁版提供自選的 Premium 定期付費會員。包括個人化設定在內的現有免費功能繼續免費，並無免費試用。月費為港幣 38 元。年費為港幣 360 元，每年一次收取，相等於每月港幣 30 元，比十二次月付少港幣 96 元。Stripe 結帳頁面會在確認前顯示總額及付款週期。只開啟結帳頁面不會扣款。",
            ],
          },
          "renewal-cancellation-refunds": {
            heading: "續訂、取消及退款",
            paragraphs: [
              "訂閱會按所選價格自動續期，直至取消。續期前可透過「會員資格 → 管理訂閱」取消日後續費、更新付款資料或查看帳單。一般取消後，會員資格維持至已付款週期結束。刪除帳戶會在清理時終止訂閱。取消不會自動退款。如遇付款錯誤或希望退款，請向支援提供相關收據以作個別審視，切勿提供完整信用卡資料。原生應用程式只顯示會員狀態，不提供數碼訂閱購買。",
            ],
          },
          "your-rights": {
            heading: "你的權利",
            paragraphs: [
              "你可要求刪除帳戶。本條款受香港法律及適用的強制性權利規管。你依法享有且不可排除的權利不受影響。",
            ],
          },
        },
      },
      "zh-Hans": {
        title: "使用条款",
        summary:
          "谁可以使用 Bookkin、你可以分享什么，以及 Premium 订阅的安排。",
        updated: "2026 年 11 月 2 日",
        contact: "邮件联系 Bookkin",
        sections: {
          eligibility: {
            heading: "使用资格",
            paragraphs: [
              "Bookkin 由 Onepile Tech Limited 运营。账户供年满 13 岁的读者使用。商店及私信仅供年满 18 岁的读者使用。请提供正确的年龄资格信息，如有错误请联系客服。无需账户也可阅读网站的公开预览。",
            ],
          },
          "content-and-safety": {
            heading: "你的内容与安全",
            paragraphs: [
              "只上传你有权使用的资料。你授权 Bookkin 为提供所选功能而保存、处理、展示及审核你的内容。已发布的帖子和公开书籍可能出现在网站预览中。请遵守社区及儿童安全守则。工作人员可暂缓发布、移除内容或限制账户。请妥善保管登录信息，并举报未经授权的访问。",
            ],
          },
          "selling-books": {
            heading: "出售或赠送实体书籍",
            paragraphs: [
              "成年读者可发布实体书籍供出售或免费赠送。请先确认书籍品相及交易安排。请勿在私信中透露付款凭证。Premium 会员资格与实体书交易分开。",
            ],
          },
          premium: {
            heading: "Bookkin Premium 会员订阅",
            paragraphs: [
              "Premium 为网页版提供的自选定期付费会员。包括个性化设置在内的所有现有免费功能继续免费，无免费试用。月付 HKD 38；年付一次收取 HKD 360，折合每月 HKD 30，比十二次月付节省 HKD 96。Stripe 结账页面会在确认前显示总额及付款周期。只打开结账页面不会扣款。",
            ],
          },
          "renewal-cancellation-refunds": {
            heading: "续订、取消及退款",
            paragraphs: [
              "订阅按所选价格自动续费，直至取消。可在下次续费前通过「会员资格 → 管理订阅」取消续费、更新付款方式及查看账单。一般取消后会员资格保留至已付费期间结束。删除账户会在清理过程中终止订阅。取消不会自动退款；付款错误或退款请求请联系支援，按个别情况及适用法定权利处理。原生应用程序仅显示会员状态。",
            ],
          },
          "your-rights": {
            heading: "你的权利",
            paragraphs: [
              "你可以请求删除账户。本条款受香港法律及适用的强制性权利管辖。你依法享有且不可排除的权利不受影响。",
            ],
          },
        },
      },
    },
  },
  community: {
    date: "2026-11-02",
    related: ["terms", "support"],
    locales: {
      en: {
        title: "Community & child safety",
        summary:
          "The standards that keep Bookkin safe, and how to report anything that concerns you.",
        updated: "2 November 2026",
        contact: "Email Bookkin",
        sections: {
          standards: {
            heading: "Community and child-safety standards",
            paragraphs: [
              "Bookkin prohibits child sexual abuse and exploitation (CSAE), including grooming, sexual extortion, child sexual abuse material (CSAM), and sexual content involving minors. Threats, harassment, hate, scams, unlawful sales and publishing another person’s private details are also prohibited.",
            ],
          },
          "protect-younger-readers": {
            heading: "Protect younger readers",
            paragraphs: [
              "Readers under 13 may not create an account. Readers aged 13–17 may not use Shop or private messaging. Keep your school, address, phone number and current location private. If someone pressures you, asks you to keep secrets or sends unsafe material, tell a trusted adult.",
            ],
          },
          "report-block-contact": {
            heading: "Report, block or contact us",
            paragraphs: [
              "Use Report on a profile, post, comment, listing or received message. Block the account to stop unwanted interactions. You can also email us without signing in. Identify the relevant screen or public link. Do not download, forward or attach suspected abuse imagery. Staff can restrict exposure, review reports, preserve necessary evidence and refer incidents to the relevant authorities as required. In immediate danger, contact local emergency services.",
            ],
          },
        },
      },
      "zh-Hant": {
        title: "社群與兒童安全",
        summary: "維護 Bookkin 安全的守則，以及如何檢舉令你擔心的內容。",
        updated: "2026 年 11 月 2 日",
        contact: "電郵 Bookkin",
        sections: {
          standards: {
            heading: "社群與兒童安全守則",
            paragraphs: [
              "Bookkin 禁止兒童性虐待及剝削，包括誘騙兒童、色情勒索、兒童性虐待材料，以及任何涉及未成年人的性內容。亦禁止威脅、騷擾、仇恨言論、詐騙、違法交易及公開他人的私人資料。",
            ],
          },
          "protect-younger-readers": {
            heading: "保護年輕讀者",
            paragraphs: [
              "未滿 13 歲人士不得建立帳戶。13 至 17 歲的讀者不能使用商店或私人訊息。請勿透露學校、住址、電話號碼或即時位置。如有人向你施壓、要求保密或傳送不安全的內容，請告訴你信任的成年人。",
            ],
          },
          "report-block-contact": {
            heading: "檢舉、封鎖或聯絡我們",
            paragraphs: [
              "你可在個人檔案、帖子、留言、書籍刊登或收到的訊息中使用「檢舉」，亦可封鎖帳戶以停止不想要的互動。毋須登入也可電郵我們，請指出相關畫面或公開連結。不要下載、轉發或附上疑似兒童虐待圖片。職員可限制內容曝光、審視檢舉、保存必要證據，並按需要向相關機構通報。如有即時危險，請聯絡當地緊急服務。",
            ],
          },
        },
      },
      "zh-Hans": {
        title: "社群与儿童安全",
        summary: "维护 Bookkin 安全的守则，以及如何举报令你担心的内容。",
        updated: "2026 年 11 月 2 日",
        contact: "邮件联系 Bookkin",
        sections: {
          standards: {
            heading: "社区与儿童安全守则",
            paragraphs: [
              "Bookkin 禁止儿童性虐待及剥削，包括诱骗儿童、色情勒索、儿童性虐待材料，以及任何涉及未成年人的性内容。亦禁止威胁、骚扰、仇恨言论、诈骗、违法交易及公开他人的私人信息。",
            ],
          },
          "protect-younger-readers": {
            heading: "保护年轻读者",
            paragraphs: [
              "未满 13 岁人士不得创建账户。13 至 17 岁的读者不能使用商店或私信。请勿透露学校、住址、电话号码或实时位置。如有人向你施压、要求保密或发送不安全的内容，请告诉你信任的成年人。",
            ],
          },
          "report-block-contact": {
            heading: "举报、屏蔽或联系我们",
            paragraphs: [
              "你可以在个人资料、帖子、评论、书籍刊登或收到的私信中使用「举报」，也可屏蔽账户以停止不想要的互动。无需登录也可发邮件给我们，请指出相关界面或公开链接。不要下载、转发或附上疑似儿童虐待的图片。工作人员可限制内容曝光、审查举报、保存必要证据，并按需要向相关机构通报。如遇紧急危险，请联系当地紧急服务。",
            ],
          },
        },
      },
    },
  },
  support: {
    date: "2026-11-02",
    action: "support",
    related: ["delete-account", "community", "privacy"],
    locales: {
      en: {
        title: "Help & support",
        summary:
          "How to reach Bookkin with or without an account, and where to find help inside the app.",
        updated: "2 November 2026",
        contact: "Email Bookkin",
        sections: {
          "with-or-without-account": {
            heading: "Help with or without an account",
            paragraphs: [
              "Email Bookkin for account access, privacy, safety, payments or other help. You can email us even if you cannot sign in or no longer have the app. Describe what happened and the screen or public link involved. Do not include passwords, verification codes, full card details or suspected child-abuse imagery.",
            ],
          },
          "inside-the-app": {
            heading: "Inside the app",
            paragraphs: [
              "Sign in and open Help & support. A receipt confirms delivery to the staff inbox. For a forgotten password, use password recovery on the sign-in screen. Recover access to a linked Google or Apple identity with that provider. To delete the account, follow the deletion instructions.",
            ],
          },
        },
      },
      "zh-Hant": {
        title: "幫助及支援",
        summary: "無論有沒有帳戶，都可聯絡 Bookkin；也可在應用程式內取得協助。",
        updated: "2026 年 11 月 2 日",
        contact: "電郵 Bookkin",
        sections: {
          "with-or-without-account": {
            heading: "有帳戶或沒有帳戶均可取得支援",
            paragraphs: [
              "如需帳戶登入、私隱、安全、付款或其他協助，請電郵 Bookkin。即使無法登入或已移除應用程式，也可電郵我們。請描述情況並指出相關畫面或公開連結。切勿傳送密碼、驗證碼、完整信用卡資料或疑似兒童虐待圖片。",
            ],
          },
          "inside-the-app": {
            heading: "在應用程式內",
            paragraphs: [
              "登入後前往「幫助及支援」。收據表示訊息已送達職員收件箱。如忘記密碼，請使用登入畫面的密碼重設功能。若無法使用已連結的 Google 或 Apple 帳戶，請透過該供應商的程序恢復存取。如需刪除帳戶，請參閱刪除步驟。",
            ],
          },
        },
      },
      "zh-Hans": {
        title: "帮助与支持",
        summary: "无论有没有账户，都可以联系 Bookkin；也可以在应用内获得帮助。",
        updated: "2026 年 11 月 2 日",
        contact: "邮件联系 Bookkin",
        sections: {
          "with-or-without-account": {
            heading: "有无账户均可获得帮助",
            paragraphs: [
              "如需账户登录、隐私、安全、付款或其他帮助，请发邮件联系 Bookkin。即使无法登录或已卸载应用，也可以发邮件给我们。请描述情况并指出相关界面或公开链接。切勿发送密码、验证码、完整信用卡信息或疑似儿童虐待的图片。",
            ],
          },
          "inside-the-app": {
            heading: "在应用内",
            paragraphs: [
              "登录后前往「帮助与支持」。收到回执表示消息已送达工作人员收件箱。如忘记密码，请使用登录界面的密码重置功能。若无法使用已关联的 Google 或 Apple 账户，请通过该提供商的流程恢复访问。如需删除账户，请参阅删除步骤。",
            ],
          },
        },
      },
    },
  },
  "delete-account": {
    date: "2026-11-02",
    action: "delete",
    related: ["privacy", "support"],
    locales: {
      en: {
        title: "Delete your Bookkin account",
        summary:
          "How to request deletion, what happens next and what is removed or kept.",
        updated: "2 November 2026",
        contact: "Email Bookkin",
        sections: {
          "request-on-the-web": {
            heading: "Request deletion on the web",
            paragraphs: [
              "You can request deletion without installing the app. Open the sign-in link below for the account you wish to delete, verify your current password or linked Google or Apple identity, then confirm. In the app, go to Settings → Account & security → Delete account. If you cannot sign in, email us with your account email and request deletion. We must verify ownership before acting on an emailed request. Never send your password or a verification code.",
            ],
          },
          "what-happens-next": {
            heading: "What happens next",
            paragraphs: [
              "Once Bookkin accepts the verified deletion, it revokes your sessions. Keep your deletion receipt or return to the same browser or app to check progress and retry a stalled task. A pending request is complete only when its status says so. Provider revocation or ending a web subscription can delay cleanup.",
            ],
          },
          "data-removed-and-retained": {
            heading: "Data removed and retained",
            paragraphs: [
              "Bookkin removes account-owned personal details, media, shelf records, posts, private chats with Kin and membership access. Shared catalogue records and other people’s content remain. Some anonymized comments or delivered messages can remain in other readers’ histories. Safety and audit records, financial records and encrypted backups can be retained separately. The privacy notice explains backup rotation and how to ask about specific retention.",
            ],
          },
        },
      },
      "zh-Hant": {
        title: "刪除 Bookkin 帳戶",
        summary: "如何要求刪除、接下來會發生甚麼事，以及哪些資料會被移除或保留。",
        updated: "2026 年 11 月 2 日",
        contact: "電郵 Bookkin",
        sections: {
          "request-on-the-web": {
            heading: "在網站要求刪除",
            paragraphs: [
              "毋須安裝應用程式也可要求刪除帳戶。使用下方連結登入要刪除的帳戶，驗證目前密碼或已連結的 Google 或 Apple 身分後，再確認刪除。應用程式內可前往「設定 → 帳戶與安全 → 刪除帳戶」。如無法登入，請電郵我們，註明你的帳戶電郵並提出刪除要求。收到電郵要求後，我們須先核實帳戶擁有人的身分。切勿傳送密碼或驗證碼。",
            ],
          },
          "what-happens-next": {
            heading: "接下來會發生甚麼事",
            paragraphs: [
              "Bookkin 接受已核實的刪除要求後，會撤銷你的登入階段。請保留刪除收據，或回到原來的瀏覽器或應用程式查詢進度及重試停滯的工作。只有狀態顯示「已完成」才表示清理完畢。撤銷供應商權限或終止網頁訂閱可能需時。",
            ],
          },
          "data-removed-and-retained": {
            heading: "刪除及保留的資料",
            paragraphs: [
              "Bookkin 會移除帳戶的個人資料、媒體、書架紀錄、帖子、與 Kin 的私人對話及會員資格。共用書目和其他讀者的內容會保留。部分已匿名的留言或已送達的訊息可能保留在其他讀者的紀錄中。安全與審計紀錄、財務紀錄及加密備份可另行保留。私隱聲明說明了備份的輪替安排，以及如何查詢個別資料的保留期限。",
            ],
          },
        },
      },
      "zh-Hans": {
        title: "删除 Bookkin 账户",
        summary: "如何申请删除、接下来会发生什么，以及哪些数据会被移除或保留。",
        updated: "2026 年 11 月 2 日",
        contact: "邮件联系 Bookkin",
        sections: {
          "request-on-the-web": {
            heading: "在网站申请删除",
            paragraphs: [
              "无需安装应用也可申请删除账户。使用下方链接登录要删除的账户，验证当前密码或已关联的 Google 或 Apple 身份后，再确认删除。应用内可前往「设置 → 账户与安全 → 删除账户」。如无法登录，请发邮件给我们，注明你的账户邮箱并提出删除请求。收到邮件请求后，我们须先核实账户拥有人的身份。切勿发送密码或验证码。",
            ],
          },
          "what-happens-next": {
            heading: "接下来会发生什么",
            paragraphs: [
              "Bookkin 接受已核实的删除请求后，会撤销你的登录会话。请保留删除回执，或回到原来的浏览器或应用查询进度及重试停滞的任务。只有状态显示「已完成」才表示清理完毕。撤销提供商权限或终止网页订阅可能需要一些时间。",
            ],
          },
          "data-removed-and-retained": {
            heading: "删除及保留的数据",
            paragraphs: [
              "Bookkin 会移除账户的个人资料、媒体、书架记录、帖子、与 Kin 的私人对话及会员资格。共享书目和其他读者的内容会保留。部分已匿名的评论或已送达的消息可能保留在其他读者的记录中。安全与审计记录、财务记录及加密备份可另行保留。隐私声明说明了备份的轮换安排，以及如何查询个别数据的保留期限。",
            ],
          },
        },
      },
    },
  },
};
