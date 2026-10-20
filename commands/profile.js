/*CMD
command: 👤 My Profile
help: View user profile and quota stats
need_reply: false
auto_retry_time: 
aliases: /profile, my profile
CMD*/

var userId = user.telegramid;
var credits = User.getProperty("credits");
if (credits == null) {
  credits = 1;
  User.setProperty("credits", 1, "integer");
}
var totalEarned = User.getProperty("total_earned") || 1;
var totalUsed = User.getProperty("total_used") || 0;
var refCount = Bot.getProperty("user_refcount_" + userId) || 0;
var refBy = User.getProperty("referred_by");
var refByText = refBy ? "`" + refBy + "`" : "None (Direct)";

var profileText = "╔═══════════════════════════════════╗\n" +
  "   👤 *usᴇr ɪᴅᴇɴᴛɪᴛʏ & ǫᴜᴏᴛa ᴘrᴏғɪʟᴇ* \n" +
  "╚═══════════════════════════════════╝\n\n" +
  "┌── 🏷 *aᴄᴄᴏᴜɴᴛ ɪᴅᴇɴᴛɪғɪᴇrs*\n" +
  "│ • *ɴaᴍᴇ:* " + user.first_name + "\n" +
  "│ • *ᴛᴇʟᴇɢraᴍ ɪᴅ:* `" + userId + "`\n" +
  "│ • *ɪɴᴠɪᴛᴇᴅ ᴏrɪɢɪɴ:* " + refByText + "\n" +
  "└──\n\n" +
  "┌── 💎 *ᴡaʟʟᴇᴛ & usaɢᴇ ᴍᴇᴛrɪᴄs*\n" +
  "│ • *aᴠaɪʟaʙʟᴇ ʙaʟaɴᴄᴇ:* `" + credits + "` ᴄrᴇᴅɪᴛs 💎\n" +
  "│ • *ʟɪғᴇᴛɪᴍᴇ ᴇarɴᴇᴅ :* `" + totalEarned + "` ᴄrᴇᴅɪᴛs\n" +
  "│ • *ᴛᴏᴛaʟ sᴇarᴄʜᴇs   :* `" + totalUsed + "` ᴇxᴇᴄᴜᴛᴇᴅ\n" +
  "│ • *aᴄᴛɪᴠᴇ ɴᴇᴛᴡᴏrᴋ   :* `" + refCount + "` rᴇғᴇrrᴇᴅ 👥\n" +
  "└──\n\n" +
  "💡 *ᴛɪᴘ:* Use '🎁 Refer & Earn' to expand your query credits automatically.";

Bot.sendMessage(profileText);
