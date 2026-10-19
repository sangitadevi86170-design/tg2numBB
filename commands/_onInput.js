/*CMD
  command: /onInput
  help: 
  need_reply: true
  auto_retry_time: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

let queryId = message ? message.trim() : "";

if (!queryId) {
  Bot.sendMessage("Koi input nahi mila. /start karein.");
  return;
}

Bot.sendMessage("Processing request for ID: " + queryId + "...");

let baseUrl = "https://jgvicvhgfwcfndgookul.supabase.co/functions/v1/bot-api?key=Toxic&tool=tgnum&term=";
let fullUrl = baseUrl + encodeURIComponent(queryId);

HTTP.get({
  url: fullUrl,
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  },
  success: "/onApiResponse",
  error: "/onApiError"
});
