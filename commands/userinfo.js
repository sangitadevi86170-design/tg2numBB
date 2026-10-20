/*CMD
command: /userinfo
help: Inspect specific user details
need_reply: false
auto_retry_time: 
aliases: /inspect
CMD*/

var ADMIN_ID = 8710308658;
if (user.telegramid != ADMIN_ID) {
  return;
}

if (!params) {
  Bot.sendMessage("Usage: `/userinfo <USER_TELEGRAM_ID>`");
  return;
}

var targetUid = params.trim();
var creds = Bot.getProperty("user_credits_" + targetUid);
var refCount = Bot.getProperty("user_refcount_" + targetUid) || 0;
var isBanned = Bot.getProperty("banned_" + targetUid) ? "🚫 YES (Banned)" : "✅ Active";

var infoMsg = "👤 *USER INSPECTION DOSSIER*\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
  "• *Telegram ID:* `" + targetUid + "`\n" +
  "• *Credits Balance:* `" + (creds != null ? creds : "Default (1)") + "` 💎\n" +
  "• *Referral Network:* `" + refCount + "` Users\n" +
  "• *Account Status:* " + isBanned + "\n\n" +
  "Quick Actions:\n" +
  "• Add Credits: `/addcredits " + targetUid + " 10`\n" +
  "• Ban Account: `/ban " + targetUid + "`\n" +
  "• Restore: `/unban " + targetUid + "`";

Bot.sendMessage(infoMsg);
