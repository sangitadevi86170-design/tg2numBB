/*CMD
  command: /onDataSuccess
  help: 
  need_reply: false
  auto_retry_buy: false
  sync_script: false
  res_var: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

try {
  let result = JSON.parse(content);
  Bot.sendMessage("Data received:\n" + JSON.stringify(result, null, 2));
} catch (e) {
  Bot.sendMessage("Response:\n" + content);
}
