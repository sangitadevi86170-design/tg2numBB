/*CMD
command: 🎁 Daily Reward
help: Claim daily free credits
need_reply: false
auto_retry_time: 
aliases: /daily, daily reward
CMD*/

var userId = user.telegramid;
var refCount = Bot.getProperty("user_refcount_" + userId) || 0;

if (refCount < 1) {
  var botName = bot.name;
  var refLink = "https://t.me/" + botName + "?start=" + userId;
  var lockMsg = "🔒 *DAILY REWARD LOCKED*\n" +
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
    "Daily Free Credit claim karne ke liye aapke account me kam se kam **1 Verified Referral** hona zaroori hai.\n\n" +
    "📌 *Apna Invite Link share karein:*\n`" + refLink + "`\n\n" +
    "Jaise hi 1 dost join karega, aapka Daily Claim unlock ho jayega!";
  Bot.sendMessage(lockMsg);
  return;
}

var lastClaimed = User.getProperty("last_claimed_timestamp");
var now = new Date().getTime();
var oneDayMs = 24 * 60 * 60 * 1000;

if (lastClaimed && (now - lastClaimed < oneDayMs)) {
  var diffMs = oneDayMs - (now - lastClaimed);
  var hoursLeft = Math.floor(diffMs / (1000 * 60 * 60));
  var minsLeft = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  Bot.sendMessage("⏳ *ALREADY CLAIMED TODAY*\n\n" +
    "Aapne aaj ka reward claim kar liya hai.\n" +
    "Agla claim: *" + hoursLeft + " Hours, " + minsLeft + " Minutes* baad unlock hoga.");
  return;
}

// Reward user
User.setProperty("last_claimed_timestamp", now, "integer");
var curCreds = User.getProperty("credits") || 0;
User.setProperty("credits", curCreds + 1, "integer");
var totalEarned = User.getProperty("total_earned") || 1;
User.setProperty("total_earned", totalEarned + 1, "integer");

Bot.sendMessage("🎉 *DAILY REWARD CLAIMED!*\n" +
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
  "Aapke account me *+1 Free Search Credit* add kar diya gaya hai!\n" +
  "• Current Balance: `" + (curCreds + 1) + "` Credits 💎\n\n" +
  "Kal dobara aakar apna reward claim karein!");
