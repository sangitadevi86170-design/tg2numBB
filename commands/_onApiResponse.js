/*CMD
  command: /onApiResponse
  help: 
  need_reply: false
  auto_retry_time: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

try {
  let res = JSON.parse(content);

  // Result display
  let text = "📋 *Response Data:*\n\n" +
             "```json\n" + JSON.stringify(res, null, 2) + "\n```";

  Bot.sendMessage(text, { parse_mode: "Markdown" });
} catch (e) {
  Bot.sendMessage("Raw response:\n" + content);
}
