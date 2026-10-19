/*CMD
  command: /onChatSuccess
  help: 
  need_reply: false
  auto_retry_time: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

try {
  let res = JSON.parse(content);

  if (res.ok && res.result) {
    let chat = res.result;
    let text = "📋 *Chat Details:*\n\n" +
               "*Title:* " + (chat.title || "N/A") + "\n" +
               "*Type:* " + (chat.type || "N/A") + "\n" +
               "*Username:* @" + (chat.username || "None") + "\n" +
               "*Description:* " + (chat.description || "None");

    Bot.sendMessage(text, { parse_mode: "Markdown" });
  } else {
    Bot.sendMessage("Telegram API response: " + (res.description || "No details found"));
  }
} catch (e) {
  Bot.sendMessage("Received response:\n" + content);
}
