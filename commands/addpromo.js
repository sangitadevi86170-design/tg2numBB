/*CMD
command: /addpromo
help: Create a new promo code
need_reply: false
auto_retry_time: 
CMD*/

var ADMIN_ID = 8710308658;
if (user.telegramid != ADMIN_ID) {
  return;
}

if (!params) {
  Bot.sendMessage("Usage: `/addpromo <CODE> <CREDITS> <MAX_USES>`\nExample: `/addpromo BONUS50 10 100`");
  return;
}

var parts = params.split(" ");
if (parts.length < 3) {
  Bot.sendMessage("Usage: `/addpromo <CODE> <CREDITS> <MAX_USES>`");
  return;
}

var code = parts[0].trim().toUpperCase();
var creds = parseInt(parts[1].trim());
var maxUses = parseInt(parts[2].trim());

if (isNaN(creds) || isNaN(maxUses)) {
  Bot.sendMessage("Invalid credits or max uses count.");
  return;
}

var promoObj = {
  code: code,
  credits: creds,
  max_uses: maxUses,
  used_count: 0
};

Bot.setProperty("promo_" + code, promoObj, "json");

Bot.sendMessage("✅ *Promo Code Created!*\n\n" +
  "• Code: `" + code + "`\n" +
  "• Credits: `+" + creds + "`\n" +
  "• Max Redemptions: `" + maxUses + "`");
