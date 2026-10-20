/*CMD
command: /pay
help: Process payment selection
need_reply: false
auto_retry_time: 
CMD*/

var plan = params || "10";
var upiId = Bot.getProperty("upi_id") || "pawank63599-1@okicici";
var price = 50;

if (plan == "50") {
  price = Bot.getProperty("plan_50") || 250;
} else if (plan == "100") {
  price = Bot.getProperty("plan_100") || 500;
} else {
  price = Bot.getProperty("plan_10") || 50;
}

var payLink = "upi://pay?pa=" + encodeURIComponent(upiId) + "&pn=TG2NUM&am=" + price + "&cu=INR";
var supUser = Bot.getProperty("support_username") || "@YOURSOLUTIONs_BOT";

var payInfo = "💳 *VIP SUBSCRIPTION PAYMENT*\n" +
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
  "• *Plan:* `" + plan + " Query Credits`\n" +
  "• *Amount Payable:* `₹" + price + "`\n" +
  "• *Receiver UPI ID:* `" + upiId + "`\n\n" +
  "📌 *STEPS TO COMPLETE:*\n" +
  "1. Pay `₹" + price + "` to UPI ID: `" + upiId + "`\n" +
  "2. Take a screenshot of the completed transaction.\n" +
  "3. Send the screenshot along with your Telegram ID (`" + user.telegramid + "`) to " + supUser + ".\n\n" +
  "Your account will be credited within 5-10 minutes!";

Api.sendMessage({
  text: payInfo,
  parse_mode: "markdown",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "📲 Pay via UPI App", url: payLink }
      ],
      [
        { text: "📞 Contact Support", url: "https://t.me/" + supUser.replace("@", "") }
      ]
    ]
  }
});
