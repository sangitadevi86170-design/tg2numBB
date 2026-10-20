/*CMD
command: 💎 Buy Credits
help: VIP pricing and UPI payment gateway
need_reply: false
auto_retry_time: 
aliases: /buy, buy credits
CMD*/

var upiId = Bot.getProperty("upi_id") || "pawank63599-1@okicici";
var p10 = Bot.getProperty("plan_10") || 50;
var p50 = Bot.getProperty("plan_50") || 250;
var p100 = Bot.getProperty("plan_100") || 500;

var buyMsg = "💎 *PURCHASE VIP QUERY ALLOCATION*\n" +
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
  "Instantly replenish your balance with priority high-speed lookups:\n\n" +
  "• *Starter Pack:* 10 Credits = `₹" + p10 + "`\n" +
  "• *Pro Pack:* 50 Credits = `₹" + p50 + "`\n" +
  "• *Ultimate Pack:* 100 Credits = `₹" + p100 + "`\n\n" +
  "💳 *Official Payment UPI:* `" + upiId + "`\n\n" +
  "After payment, tap **Submit UTR / Payment** or contact support with transaction screenshot.";

Api.sendMessage({
  text: buyMsg,
  parse_mode: "markdown",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "💵 Pay via UPI (10 Credits)", callback_data: "/pay 10" },
        { text: "💵 Pay via UPI (50 Credits)", callback_data: "/pay 50" }
      ],
      [
        { text: "💎 Pay via UPI (100 Credits)", callback_data: "/pay 100" }
      ],
      [
        { text: "📞 Contact Support", callback_data: "📞 Support" }
      ]
    ]
  }
});
