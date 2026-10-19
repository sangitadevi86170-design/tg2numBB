/*CMD
  command: /onChatInput
  help: 
  need_reply: true
  auto_retry_time: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

let chatId = message;

if (!chatId) {
  Bot.sendMessage("No input provided. Please run /start again.");
  return;
}

Bot.sendMessage("Fetching information for: " + chatId + "...");

// Example using official Telegram Bot API getChat
// In Bots.Business, you can store your bot token in Bot Property or replace directly
let botToken = bot.token || "YOUR_BOT_TOKEN";
let url = "https://api.telegram.org/bot" + botToken + "/getChat?chat_id=" + encodeURIComponent(chatId);

HTTP.get({
  url: url,
  success: "/onChatSuccess",
  error: "/onChatError"
});
