/*CMD
command: 📞 Support
help: Contact support
need_reply: false
auto_retry_time: 
aliases: /support, support
CMD*/

var supUser = Bot.getProperty("support_username") || "@YOURSOLUTIONs_BOT";
var cleanSup = supUser.replace("@", "");

var supportMsg = "📞 *CUSTOMER ASSISTANCE & INQUIRIES*\n" +
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
  "For VIP access validation, enterprise API integrations, or query discrepancies:\n\n" +
  "• *Executive Support Desk:* " + supUser + "\n" +
  "• *Working Hours:* 24/7 Automated Queuing\n\n" +
  "Tap below to launch a direct message thread:";

Api.sendMessage({
  text: supportMsg,
  parse_mode: "markdown",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "💬 Open Direct Chat", url: "https://t.me/" + cleanSup }
      ]
    ]
  }
});
