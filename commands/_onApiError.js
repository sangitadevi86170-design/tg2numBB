/*CMD
  command: /onApiError
  help: 
  need_reply: false
  auto_retry_time: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

// Bots.Business error callback me content, http_status ya options provide karta hai
let errText = "❌ *API Request Error:*\n\n";

if (typeof http_status !== "undefined") {
  errText += "• *HTTP Status:* `" + http_status + "`\n";
}

if (typeof content !== "undefined" && content) {
  errText += "• *Response:* `" + content + "`\n";
} else {
  errText += "• *Details:* Endpoint down hai ya parameters galat hain.\n";
}

Bot.sendMessage(errText, { parse_mode: "Markdown" });
