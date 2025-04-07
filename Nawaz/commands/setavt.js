module.exports.config = {
  name: "setavt",
  version: "1.0.0",
  hasPermssion: 2, // Only admin use
  credits: "Nawaz Boss",
  description: "Reply image with +setavt to change bot profile picture",
  commandCategory: "admin",
  usages: "[reply image]",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const fs = require("fs-extra");
  const axios = require("axios");

  if (!event.messageReply || !event.messageReply.attachments[0]) {
    return api.sendMessage("भाई फोटो पर reply कर के use कर ना।", event.threadID, event.messageID);
  }

  const url = event.messageReply.attachments[0].url;
  const path = __dirname + "/setavt.jpg";

  const response = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFileSync(path, Buffer.from(response.data, "utf-8"));

  api.changeAvatar(fs.createReadStream(path), (err) => {
    if (err) return api.sendMessage("DP चेंज करने में error आया भाई!", event.threadID, event.messageID);
    api.sendMessage("बॉट की DP Successfully Change हो गई भाई!", event.threadID, event.messageID);
    fs.unlinkSync(path);
  });
};