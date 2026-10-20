/*CMD
command: /setlog
help: Set log audit channel
need_reply: false
auto_retry_time: 
CMD*/

var ADMIN_ID = 8710308658;
if (user.telegramid != ADMIN_ID) {
  return;
}

if (!params) {
  var cur = Bot.getProperty("log_channel") || "-1003946288718";
  Bot.sendMessage("Current Log Channel: `" + cur + "`\n\nUsage: `/setlog -100xxxxxxxx`");
  return;
}

var logCh = params.trim();
Bot.setProperty("log_channel", logCh, "string");
Bot.sendMessage("✅ Log audit channel updated to: `" + logCh + "`");
