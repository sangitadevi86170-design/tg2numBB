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

  // 1. Check if response is empty array: []
  if (Array.isArray(res) && res.length === 0) {
    Bot.sendMessage("❌ *Koi record nahi mila.* (No data found for this query)", { parse_mode: "Markdown" });
    return;
  }

  // 2. If array contains items, pick the first item
  let data = Array.isArray(res) ? res[0] : res;

  // 3. Format the keys cleanly
  let text = "📋 *Result Found:*\n\n";
  let hasFields = false;

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      text += "• *" + key + ":* `" + data[key] + "`\n";
      hasFields = true;
    }
  }

  if (!hasFields) {
    text = "📋 *Response:*\n```json\n" + JSON.stringify(res, null, 2) + "\n```";
  }

  Bot.sendMessage(text, { parse_mode: "Markdown" });

} catch (e) {
  // If response is not JSON
  if (content && content.trim().length > 0) {
    Bot.sendMessage("📋 *Response:*\n" + content);
  } else {
    Bot.sendMessage("❌ *Khali response mila.*");
  }
}
