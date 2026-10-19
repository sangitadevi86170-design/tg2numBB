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

  // 1. Check if empty array: []
  if (Array.isArray(res) && res.length === 0) {
    Bot.sendMessage("❌ *Koi record nahi mila.* (No data found for this ID)", { parse_mode: "Markdown" });
    return;
  }

  // 2. If array contains items, iterate over them
  if (Array.isArray(res)) {
    let msg = "📋 *Results Found:*\n\n";
    for (let i = 0; i < res.length; i++) {
      let item = res[i];
      for (let key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          msg += "• *" + key + ":* `" + item[key] + "`\n";
        }
      }
      msg += "\n───────────────\n";
    }
    Bot.sendMessage(msg, { parse_mode: "Markdown" });
    return;
  }

  // 3. If direct object
  let text = "📋 *Result Found:*\n\n";
  let hasData = false;
  for (let key in res) {
    if (Object.prototype.hasOwnProperty.call(res, key)) {
      text += "• *" + key + ":* `" + res[key] + "`\n";
      hasData = true;
    }
  }

  if (!hasData) {
    text = "📋 *Response:*\n```json\n" + JSON.stringify(res, null, 2) + "\n```";
  }

  Bot.sendMessage(text, { parse_mode: "Markdown" });

} catch (e) {
  if (content && content.trim().length > 0) {
    Bot.sendMessage("📋 *Response:*\n" + content);
  } else {
    Bot.sendMessage("❌ *Khali response mila.*");
  }
}
