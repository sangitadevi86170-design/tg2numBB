/*CMD
command: 🎁 Refer & Earn
help: Get referral link and invite stats
need_reply: false
auto_retry_time: 
aliases: /refer, refer & earn
CMD*/

var botName = bot.name;
var userId = user.telegramid;
var refLink = "https://t.me/" + botName + "?start=" + userId;
var refBonus = Bot.getProperty("referral_reward") || 5;
var totalRefs = Bot.getProperty("user_refcount_" + userId) || 0;

var referText = "🎁 *rᴇғᴇr & ᴇarɴ ғrᴇᴇ ᴄrᴇᴅɪᴛs*\n" +
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
  "Share your referral link with friends or Telegram groups to unlock bonus credits!\n\n" +
  "• *Referral Reward:* `+" + refBonus + " Credits` per active user\n" +
  "• *Total Friends Invited:* `" + totalRefs + " Users` 👥\n\n" +
  "🔗 *Your Unique Referral Link:*\n" +
  "`" + refLink + "`\n\n" +
  "Tap the link to copy or share directly with friends!";

var shareUrl = "https://t.me/share/url?url=" + encodeURIComponent(refLink) + "&text=" + encodeURIComponent("Check Telegram ID to Phone number using TG2NUM Bot:");

Api.sendMessage({
  text: referText,
  parse_mode: "markdown",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "📤 Share Referral Link", url: shareUrl }
      ]
    ]
  }
});
