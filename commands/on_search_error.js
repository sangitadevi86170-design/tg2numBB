/*CMD
command: /on_search_error
help: Handle network error from OSINT gateway
need_reply: false
auto_retry_time: 
CMD*/

var userId = user.telegramid;
var ADMIN_ID = 8710308658;
var isOwner = (userId == ADMIN_ID);

if (!isOwner) {
  var cur = User.getProperty("credits") || 0;
  User.setProperty("credits", cur + 1, "integer");
  var used = User.getProperty("total_used") || 1;
  User.setProperty("total_used", Math.max(0, used - 1), "integer");
}

Bot.sendMessage("⚠️ Gateway connect hone me samasya aayi. Aapka 1 credit wapas account me add kar diya gaya hai.");
