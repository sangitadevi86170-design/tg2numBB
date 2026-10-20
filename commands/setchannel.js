/*CMD
command: /setchannel
help: Add or remove a forced subscription channel
need_reply: false
auto_retry_time: 
CMD*/

var ADMIN_ID = 8710308658;
if (user.telegramid != ADMIN_ID) {
  return;
}

if (!params) {
  var list = Bot.getProperty("force_channels") || [];
  var msg = "📢 *FORCE SUBSCRIPTION CHANNELS:*\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  if (list.length == 0) {
    msg += "No channels configured.\n";
  } else {
    for (var i = 0; i < list.length; i++) {
      msg += (i + 1) + ". `" + list[i].chat_id + "` (" + (list[i].name || "Channel") + ")\n   Link: " + (list[i].invite_link || "None") + "\n";
    }
  }
  msg += "\n*Commands:*\n" +
    "• Add: `/setchannel add @channel_username ChannelName https://t.me/channel`\n" +
    "• Remove: `/setchannel del @channel_username`\n" +
    "• Clear all: `/setchannel clear`";
  Bot.sendMessage(msg);
  return;
}

var parts = params.split(" ");
var action = parts[0].toLowerCase();
var channels = Bot.getProperty("force_channels") || [];

if (action == "clear") {
  Bot.setProperty("force_channels", [], "json");
  Bot.sendMessage("✅ All force channels cleared.");
  return;
}

if (action == "del" || action == "remove") {
  if (parts.length < 2) {
    Bot.sendMessage("Usage: `/setchannel del @channel_id`");
    return;
  }
  var target = parts[1].trim();
  var filtered = [];
  for (var j = 0; j < channels.length; j++) {
    if (channels[j].chat_id != target) {
      filtered.push(channels[j]);
    }
  }
  Bot.setProperty("force_channels", filtered, "json");
  Bot.sendMessage("✅ Channel `" + target + "` removed from force list.");
  return;
}

if (action == "add") {
  if (parts.length < 2) {
    Bot.sendMessage("Usage: `/setchannel add <@channel_or_id> [Name] [Link]`");
    return;
  }
  var chId = parts[1].trim();
  var chName = parts[2] ? parts[2].trim() : chId;
  var chLink = parts[3] ? parts[3].trim() : (chId.indexOf("@") == 0 ? "https://t.me/" + chId.replace("@", "") : "");

  channels.push({
    chat_id: chId,
    name: chName,
    invite_link: chLink
  });

  Bot.setProperty("force_channels", channels, "json");
  Bot.sendMessage("✅ Channel `" + chId + "` added successfully!");
  return;
}
