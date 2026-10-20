/*CMD
command: /on_membership_error
help: Fallback if bot has no permissions or channel error
need_reply: false
auto_retry_time: 
CMD*/

// In case Telegram API has an error checking channel (e.g. Bot not admin yet), allow user through so bot doesn't get stuck
User.setProperty("channels_verified", true, "boolean");
Bot.runCommand("/start");
