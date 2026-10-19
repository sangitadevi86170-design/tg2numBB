/*CMD
  command: /onInput
  help: 
  need_reply: true
  auto_retry_time: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

let queryId = message;

if (!queryId) {
  Bot.sendMessage("Koi input nahi mila. /start karein.");
  return;
}

Bot.sendMessage("Processing request for ID: " + queryId + "...");

// Apni API ka base URL set karein jisme query parameter pass hota hai
let baseUrl = "https://jsonplaceholder.typicode.com/posts?userId=";
let fullUrl = baseUrl + encodeURIComponent(queryId);

HTTP.get({
  url: fullUrl,
  success: "/onApiResponse",
  error: "/onApiError"
});
