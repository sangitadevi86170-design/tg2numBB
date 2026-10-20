/*CMD
command: /unban
help: Unban user
need_reply: false
auto_retry_time: 
CMD*/

var ADMIN_ID = 8710308658;
if (user.telegramid != ADMIN_ID) {
  return;
}

if (!params) {
  Bot.sendMessage("Usage: `/unban <USER_ID>`");
  return;
}

var targetUid = params.trim();
Bot.setProperty("banned_" + targetUid, false, "boolean");

Bot.sendMessage("✅ User `" + targetUid + "` has been *UNBANNED*.");
