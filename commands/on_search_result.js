/*CMD
command: /on_search_result
help: Handle API response from OSINT gateway
need_reply: false
auto_retry_time: 
CMD*/

var queryId = User.getProperty("current_query_id") || "Unknown";
var userId = user.telegramid;
var ADMIN_ID = 8710308658;
var isOwner = (userId == ADMIN_ID);

function refundCredit() {
  if (!isOwner) {
    var cur = User.getProperty("credits") || 0;
    User.setProperty("credits", cur + 1, "integer");
    var used = User.getProperty("total_used") || 1;
    User.setProperty("total_used", Math.max(0, used - 1), "integer");
  }
}

if (http_status == null) {
  refundCredit();
  Bot.sendMessage("⚠️ Server response timeout. Aapka credit refund kar diya gaya hai.");
  return;
}

var status = Number(http_status);
if (status < 200 || status >= 300) {
  refundCredit();
  Bot.sendMessage("⚠️ Gateway busy hai ya error mila. Aapka credit refund kar diya gaya hai.");
  return;
}

try {
  var res = JSON.parse(content);
  
  if (res && res.data && res.data.phone_number) {
    var data = res.data;
    var tgId = data.telegram_id || queryId;
    var phone = String(data.phone_number || "N/A").trim();
    var cleanDigits = phone.replace(/\D/g, "");
    var country = data.country || "N/A";

    var report = "╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮\n" +
      "  📡 *ᴛᴇʟᴇɢraᴍ ɪɴᴛᴇʟʟɪɢᴇɴᴄᴇ rᴇᴘᴏrᴛ*\n" +
      "╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n" +
      "┌── 👤 *ɪᴅᴇɴᴛɪᴛʏ ᴅᴏssɪᴇr*\n" +
      "│ • *ᴛᴇʟᴇɢraᴍ ɪᴅ*   : `" + tgId + "`\n" +
      "│ • *ᴘʜᴏɴᴇ ɴᴜᴍʙᴇr*  : `" + phone + "`\n" +
      "│ • *ᴏrɪɢɪɴ / sᴛaᴛᴇ*: `" + country + "`\n" +
      "└──";

    var inlineBtns = [];
    if (cleanDigits && cleanDigits.length > 5) {
      inlineBtns.push([
        { text: "💬 Open in WhatsApp", url: "https://wa.me/" + cleanDigits }
      ]);
    }

    Api.sendMessage({
      text: report,
      parse_mode: "markdown",
      reply_markup: {
        inline_keyboard: inlineBtns
      }
    });
    return;
  }

  // If raw string returned
  if (res && res.raw) {
    var rawText = String(res.raw);
    var lowerRaw = rawText.toLowerCase();

    if (lowerRaw.indexOf("error") > -1 || lowerRaw.indexOf("timeout") > -1 || lowerRaw.indexOf("supabase") > -1) {
      refundCredit();
      Bot.sendMessage("❌ Is ID ka koi verified record nahi mila.");
      return;
    }

    var reportRaw = "╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮\n" +
      "  📡 *ᴛᴇʟᴇɢraᴍ ɪɴᴛᴇʟʟɪɢᴇɴᴄᴇ rᴇᴘᴏrᴛ*\n" +
      "╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n" +
      "```\n" + rawText + "\n```";

    Bot.sendMessage(reportRaw);
    return;
  }

  // No record
  refundCredit();
  Bot.sendMessage("❌ Is Telegram ID ka koi record nahi mila.");

} catch (err) {
  refundCredit();
  Bot.sendMessage("❌ Is Telegram ID ka koi record nahi mila.");
}
