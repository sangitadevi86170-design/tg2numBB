/*CMD
  command: Fetch Data
  help: 
  need_reply: false
  auto_retry_buy: false
  sync_script: false
  res_var: 
  folder: 
  answer: 
  keyboard: 
  aliases: /fetch
  group: 
CMD*/

let endpoint = "https://jsonplaceholder.typicode.com/todos/1";

HTTP.get({
  url: endpoint,
  success: "/onDataSuccess",
  error: "/onDataError"
});
