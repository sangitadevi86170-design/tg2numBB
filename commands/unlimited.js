/*CMD
command: 🚀 Unlimited Free Search
help: Add bot to group for unlimited searches
need_reply: false
auto_retry_time: 
aliases: /unlimited, unlimited free search
CMD*/

var botName = bot.name;
var minMembers = Bot.getProperty("group_min_members") || 100;
var addBotUrl = "https://t.me/" + botName + "?startgroup=true&admin=post_messages+delete_messages+invite_users";

var unlimitedMsg = "🚀 *ᴜɴʟɪᴍɪᴛᴇᴅ ғrᴇᴇ sᴇarᴄʜ*\n" +
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
  "Apne Telegram group me Unlimited Free Search chalane ke liye:\n\n" +
  "• Group me kam se kam *" + minMembers + "+ Real Members* hone chahiye.\n" +
  "• Unlimited Search sirf **Group Owner & Admins** ke liye active hoti hai.\n" +
  "• Fake/dead members wale groups ka access suspend kar diya jayega.\n\n" +
  "Neeche diye button par click karke bot ko apne group me **Admin** banayein 👇";

Api.sendMessage({
  text: unlimitedMsg,
  parse_mode: "markdown",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "➕ Add Bot to Your Group", url: addBotUrl }
      ]
    ]
  }
});
