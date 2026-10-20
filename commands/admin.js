/*CMD
command: 👑 Admin Control Panel
help: Owner administration dashboard
need_reply: false
auto_retry_time: 
aliases: /admin, admin
CMD*/

var ADMIN_ID = 8710308658;
var userId = user.telegramid;

if (userId != ADMIN_ID) {
  Bot.sendMessage("🚫 *Unauthorized access. Admin only.*");
  return;
}

var totalUsers = Bot.getProperty("total_users_count") || 1;
var refReward = Bot.getProperty("referral_reward") || 5;
var supUser = Bot.getProperty("support_username") || "@YOURSOLUTIONs_BOT";
var upiId = Bot.getProperty("upi_id") || "pawank63599-1@okicici";

var adminMsg = "👑 *EXECUTIVE ADMIN CONTROL CONSOLE*\n" +
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
  "👥 *Total Registered Entities:* `" + totalUsers + "`\n" +
  "🎁 *Referral Bonus Reward:* `+" + refReward + " Credits/Friend`\n" +
  "📞 *Support Handle:* `" + supUser + "`\n" +
  "💳 *Merchant Gateway UPI:* `" + upiId + "`\n" +
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
  "Quick Commands:\n" +
  "• `/addcredits <USER_ID> <AMOUNT>`\n" +
  "• `/removecredits <USER_ID> <AMOUNT>`\n" +
  "• `/ban <USER_ID>`\n" +
  "• `/unban <USER_ID>`\n" +
  "• `/addpromo <CODE> <CREDITS> <MAX_USES>`\n" +
  "• `/setref <AMOUNT>`\n" +
  "• `/setupi <UPI_ID>`";

Api.sendMessage({
  text: adminMsg,
  parse_mode: "markdown"
});
