/*CMD
command: *
help: Main message dispatcher for search queries and input handling
need_reply: false
auto_retry_time: 
CMD*/

var text = (message || "").trim();
var ADMIN_ID = 8710308658;
var userId = user.telegramid;

// Check ban
if (User.getProperty("is_banned")) {
  Bot.sendMessage("🚫 *Your account is banned.*");
  return;
}

// Ignore commands handled by explicit handlers
if (text.startsWith("/") || text == "👤 My Profile" || text == "🎁 Refer & Earn" || 
    text == "🎁 Daily Reward" || text == "🎟️ Redeem Code" || text == "💎 Buy Credits" || 
    text == "📞 Support" || text == "👑 Admin Control Panel") {
  return;
}

// Check if input is a Telegram ID (only digits, 7-12 length)
var isDigitsOnly = /^\d{7,12}$/.test(text);

if (!isDigitsOnly) {
  Bot.sendMessage("⚠️ *Invalid Input Format!*\n\n" +
    "Please send a valid **9 or 10 Digit Telegram User ID** for lookup.\n" +
    "• *Example:* `1234567890`");
  return;
}

// User credit check
var isOwner = (userId == ADMIN_ID);
var credits = User.getProperty("credits");
if (credits == null) {
  credits = 1;
  User.setProperty("credits", 1, "integer");
}

if (!isOwner && credits < 1) {
  var botName = bot.name;
  var refLink = "https://t.me/" + botName + "?start=" + userId;
  var refBonus = Bot.getProperty("referral_reward") || 5;

  var noCredsMsg = "🔒 *INSUFFICIENT QUERY BALANCE*\n" +
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
    "Aapke account me *0 Credits* bache hain.\n\n" +
    "Credit badhane ke do aasan tareeqe:\n" +
    "1. *Refer Friends:* Apne invite link se dosto ko join karayein aur paayein `+" + refBonus + " Credits` per refer!\n" +
    "   🔗 `" + refLink + "`\n\n" +
    "2. *Buy Credits:* VIP Instant allocation purchase karein.";

  Api.sendMessage({
    text: noCredsMsg,
    parse_mode: "markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "💎 Buy VIP Credits", callback_data: "💎 Buy Credits" },
          { text: "🎁 Refer & Earn", callback_data: "🎁 Refer & Earn" }
        ]
      ]
    }
  });
  return;
}

// Deduct 1 credit if not admin
if (!isOwner) {
  User.setProperty("credits", credits - 1, "integer");
  var used = User.getProperty("total_used") || 0;
  User.setProperty("total_used", used + 1, "integer");
}

// Store current query ID for the callback
User.setProperty("current_query_id", text, "string");

Bot.sendMessage("🛰 *[■■■■■□□□□□] 50%* — Query Dispatched to OSINT Gateway...");

// External Supabase OSINT API request
var apiUrl = "https://jgvicvhgfwcfndgookul.supabase.co/functions/v1/bot-api?key=Toxic&tool=tgnum&term=" + encodeURIComponent(text);

HTTP.get({
  url: apiUrl,
  success: "/on_search_result",
  error: "/on_search_error"
});
