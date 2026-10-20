/*CMD
command: /removecredits
help: Deduct credits from user
need_reply: false
auto_retry_time: 
CMD*/

var ADMIN_ID = 8710308658;
if (user.telegramid != ADMIN_ID) {
  return;
}

if (!params) {
  Bot.sendMessage("Usage: `/removecredits <USER_ID> <AMOUNT>`");
  return;
}

var parts = params.split(" ");
if (parts.length < 2) {
  Bot.sendMessage("Usage: `/removecredits <USER_ID> <AMOUNT>`");
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
var updated = Math.max(0, cur - amount);
Bot.setProperty(key, updated, "integer");

Bot.sendMessage("✅ Deducted `" + amount + "` credits from User `" + targetUid + "`. New Balance: `" + updated + "`.");
