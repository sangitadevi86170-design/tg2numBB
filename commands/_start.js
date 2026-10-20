/*CMD
command: /start
help: Start bot and show menu
need_reply: false
auto_retry_time: 
aliases: start
CMD*/

var ADMIN_ID = 8710308658;
var userId = user.telegramid;

// Initialize defaults if not set
if (Bot.getProperty("referral_reward") == null) {
  Bot.setProperty("referral_reward", 5, "integer");
}
if (Bot.getProperty("support_username") == null) {
  Bot.setProperty("support_username", "@YOURSOLUTIONs_BOT", "string");
}
if (Bot.getProperty("upi_id") == null) {
  Bot.setProperty("upi_id", "pawank63599-1@okicici", "string");
}
if (Bot.getProperty("plan_10") == null) {
  Bot.setProperty("plan_10", 50, "integer");
}
if (Bot.getProperty("plan_50") == null) {
  Bot.setProperty("plan_50", 250, "integer");
}
if (Bot.getProperty("plan_100") == null) {
  Bot.setProperty("plan_100", 500, "integer");
}

// User ban check
var isBannedGlobal = Bot.getProperty("banned_" + userId);
if (User.getProperty("is_banned") || isBannedGlobal) {
  Bot.sendMessage("🚫 *Your account has been suspended by administration.*");
  return;
}

// Check first time registration & referral
var isRegistered = User.getProperty("registered");
if (!isRegistered) {
  User.setProperty("registered", true, "boolean");
  User.setProperty("credits", 1, "integer");
  User.setProperty("total_earned", 1, "integer");
  User.setProperty("total_used", 0, "integer");

  // Referral tracking
  if (params && params != "" && params != String(userId)) {
    var refId = parseInt(params);
    if (!isNaN(refId) && refId > 0) {
      User.setProperty("referred_by", refId, "integer");
      
      // Award referrer
      var refBonus = Bot.getProperty("referral_reward") || 5;
      var refKeyCredits = "user_credits_" + refId;
      var curRefCreds = Bot.getProperty(refKeyCredits) || 1;
      Bot.setProperty(refKeyCredits, curRefCreds + refBonus, "integer");

      var refKeyCount = "user_refcount_" + refId;
      var curRefCount = Bot.getProperty(refKeyCount) || 0;
      Bot.setProperty(refKeyCount, curRefCount + 1, "integer");

      // Notify referrer
      var refNotice = "🎉 *New Referral Alert!*\n\n" +
        "Someone just joined using your invite link!\n" +
        "• *Bonus Added:* `+" + refBonus + " Credits` 💎";
      
      Bot.sendMessageToChatWithId(refId, refNotice);
    }
  }

  // Increment global users count
  var totalUsers = Bot.getProperty("total_users_count") || 0;
  Bot.setProperty("total_users_count", totalUsers + 1, "integer");
}

// Sync global credits to user property if set
var globalCreds = Bot.getProperty("user_credits_" + userId);
if (globalCreds != null) {
  User.setProperty("credits", globalCreds, "integer");
  Bot.setProperty("user_credits_" + userId, null);
}

// Main Menu Text
var welcome = "╔═══════════════════════════════════╗\n" +
  "   🛰 *ᴛɢ2ɴᴜᴍ — ᴏsɪɴᴛ ɪɴᴛᴇʟʟɪɢᴇɴᴄᴇ ʙᴏᴛ* \n" +
  "╚═══════════════════════════════════╝\n\n" +
  "Welcome *" + user.first_name + "*!\n\n" +
  "🔍 *HOW TO USE:*\n" +
  "Send any **9 to 10 Digit Telegram User ID** directly in this chat to reveal linked intelligence (Phone, State, Carrier).\n\n" +
  "• Example: `1234567890`\n\n" +
  "⚡ *Select an option below to manage credits, profile, or VIP plans:*";

// Keyboard options
var buttons = [
  ["👤 My Profile", "🎁 Refer & Earn"],
  ["🎁 Daily Reward", "🎟️ Redeem Code"],
  ["💎 Buy Credits", "📞 Support"]
];

if (userId == ADMIN_ID) {
  buttons.push(["👑 Admin Control Panel"]);
}

Bot.sendKeyboard(buttons, welcome);
