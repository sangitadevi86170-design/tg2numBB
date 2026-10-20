/*CMD
command: /addcredits
help: Add credits to user
need_reply: false
auto_retry_time: 
CMD*/

var ADMIN_ID = 8710308658;
if (user.telegramid != ADMIN_ID) {
  return;
}

if (!params) {
  Bot.sendMessage("Usage: `/addcredits <USER_ID> <AMOUNT>`");
  return;
}

var parts = params.split(" ");
if (parts.length < 2) {
  Bot.sendMessage("Usage: `/addcredits <USER_ID> <AMOUNT>`");
  return;
}

var targetUid = parts[0].trim();
var amount = parseInt(parts[1].trim());

if (isNaN(amount)) {
  Bot.sendMessage("Invalid amount.");
  return;
}

var key = "user_credits_" + targetUid;
var cur = Bot.getProperty(key) || 0;
Bot.setProperty(key, cur + amount, "integer");

Bot.sendMessage("✅ Added `" + amount + "` credits to User `" + targetUid + "`.");

// Notify target user
Bot.sendMessageToChatWithId(targetUid, "🎁 Admin has credited *" + amount + " credits* to your account!");
