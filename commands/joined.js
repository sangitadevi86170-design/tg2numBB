/*CMD
command: /joined
help: Check user membership in forced channels
need_reply: false
auto_retry_time: 
aliases: check_join
CMD*/

var channels = Bot.getProperty("force_channels") || [];
var ADMIN_ID = 8710308658;
var userId = user.telegramid;

if (userId == ADMIN_ID || channels.length == 0) {
  Bot.runCommand("/start");
  return;
}

// User passed verification check trigger
Bot.sendMessage("🔄 *Verifying channel memberships...*");

// We check first channel or redirect
Api.getChatMember({
  chat_id: channels[0].chat_id,
  user_id: userId,
  on_result: "/on_membership_result",
  on_error: "/on_membership_error"
});
