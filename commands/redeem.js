/*CMD
command: 🎟️ Redeem Code
help: Enter promo or redeem code
need_reply: true
auto_retry_time: 
aliases: /redeem, redeem code
CMD*/

var inputCode = (message || "").trim().toUpperCase();

if (inputCode == "CANCEL" || inputCode == "❌ CANCEL" || inputCode == "/CANCEL") {
  Bot.sendMessage("🚫 Redemption process cancelled.");
  return;
}

var userId = user.telegramid;
var refCount = Bot.getProperty("user_refcount_" + userId) || 0;
var minRefers = Bot.getProperty("redeem_min_refers") || 5;

if (refCount < minRefers) {
  Bot.sendMessage("🚫 *ACCESS DENIED!*\n" +
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
    "Redeem code use karne ke liye kam se kam *" + minRefers + " Verified Referrals* hona anivarya hai.\n\n" +
    "• *Aapke Verified Referrals:* `" + refCount + "`\n" +
    "• *Required Referrals:* `" + minRefers + "`");
  return;
}

// Check promo code in Bot storage
var promoData = Bot.getProperty("promo_" + inputCode);
if (!promoData) {
  Bot.sendMessage("❌ *Invalid Promo Code!* Aisa koi code exist nahi karta.");
  return;
}

// Check if user already claimed this promo
var alreadyClaimed = User.getProperty("redeemed_" + inputCode);
if (alreadyClaimed) {
  Bot.sendMessage("⚠️ *Already Redeemed!* Aap ye code pehle hi claim kar chuke hain.");
  return;
}

// Check max uses
if (promoData.used_count >= promoData.max_uses) {
  Bot.sendMessage("⌛ *Code Expired!* Is code ki maximum limit poori ho chuki hai.");
  return;
}

// Increment used count
promoData.used_count = (promoData.used_count || 0) + 1;
Bot.setProperty("promo_" + inputCode, promoData, "json");
User.setProperty("redeemed_" + inputCode, true, "boolean");

// Add credits to user
var creditsToGive = promoData.credits || 5;
var curCreds = User.getProperty("credits") || 0;
User.setProperty("credits", curCreds + creditsToGive, "integer");
var totalEarned = User.getProperty("total_earned") || 1;
User.setProperty("total_earned", totalEarned + creditsToGive, "integer");

Bot.sendMessage("🎉 *CODE REDEEMED SUCCESSFULLY!*\n\n" +
  "• Code: `" + inputCode + "`\n" +
  "• Credits Added: `+" + creditsToGive + " Credits` 💎\n" +
  "• Total Balance: `" + (curCreds + creditsToGive) + "` Credits");
