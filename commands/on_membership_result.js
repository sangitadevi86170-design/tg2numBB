/*CMD
command: /on_membership_result
help: Handle chat member check result
need_reply: false
auto_retry_time: 
CMD*/

var status = options ? options.status : null;

if (status == "member" || status == "administrator" || status == "creator" || status == "restricted") {
  User.setProperty("channels_verified", true, "boolean");
  Bot.sendMessage("✅ *Verification Successful! Welcome to TG2NUM Bot.*");
  Bot.runCommand("/start");
} else {
  var channels = Bot.getProperty("force_channels") || [];
  var joinText = "⚠️ *MEMBERSHIP REQUIRED*\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
    "Bot ko use karne ke liye aapko hamare official channel ko join karna anivarya hai:\n\n";

  var inlineBtns = [];
  for (var i = 0; i < channels.length; i++) {
    var link = channels[i].invite_link || ("https://t.me/" + channels[i].chat_id.replace("@", ""));
    joinText += "• [" + (channels[i].name || "Official Channel") + "](" + link + ")\n";
    inlineBtns.push([{ text: "📢 Join " + (channels[i].name || "Channel"), url: link }]);
  }

  joinText += "\nJoin karne ke baad neeche diye button par click karein 👇";
  inlineBtns.push([{ text: "✅ I Have Joined", callback_data: "/joined" }]);

  Api.sendMessage({
    text: joinText,
    parse_mode: "markdown",
    reply_markup: { inline_keyboard: inlineBtns }
  });
}
