/*CMD
command: /toprefs
help: View top referrers
need_reply: false
auto_retry_time: 
aliases: /leaderboard
CMD*/

var ADMIN_ID = 8710308658;
var totalUsers = Bot.getProperty("total_users_count") || 1;
var refReward = Bot.getProperty("referral_reward") || 5;

var topMsg = "🏆 *TOP REFERRAL LEADERBOARD*\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
  "• *Referral Reward Rate:* `+" + refReward + " Credits/User`\n" +
  "• *Total Registered Users:* `" + totalUsers + "`\n\n" +
  "💡 _User refer counts are updated in real-time as associates join via invite links._";

Bot.sendMessage(topMsg);
