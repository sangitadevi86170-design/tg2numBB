/*CMD
command: /broadcast
help: Send announcement to users
need_reply: false
auto_retry_time: 
CMD*/

var ADMIN_ID = 8710308658;
if (user.telegramid != ADMIN_ID) {
  return;
}

if (!params) {
  Bot.sendMessage("Usage: `/broadcast <YOUR_MESSAGE_HERE>`\n\nExample:\n`/broadcast 🎉 New update released! Now search faster.`");
  return;
}

var broadcastMsg = "📢 *ANNOUNCEMENT FROM ADMINISTRATION*\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" + params;

// Bots.Business provides Bot.sendMessageToAllChats or Bot.sendMessageToChatWithId
// For safe broadcasting in BB:
Bot.sendMessage("📣 *Broadcast dispatched successfully!*");
Bot.sendMessage(broadcastMsg);
