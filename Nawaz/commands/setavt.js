module.exports.config = {
  name: "setavt",
  version: "1.0.2",
  hasPermssion: 2,
  credits: "Nawaz Boss",
  description: "Reply image with +setavt to change bot profile picture",
  commandCategory: "admin",
  usages: "[reply image]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const fs = require("fs-extra");
  const axios = require("axios");

  if (!event.messageReply || event.messageReply.attachments.length == 0) {
    return api.sendMessage("Reply किसी image पर करो भाई।", event.threadID, event.messageID);
  }

  const imgUrl = event.messageReply.attachments[0].url;
  const path = __dirname + "/cache/avt.jpg";

  const response = await axios.get(imgUrl, { responseType: "arraybuffer" });
  fs.writeFileSync(path, Buffer.from(response.data, "utf-8"));

  api.changeAvatar(fs.createReadStream(path), event.threadID, () => {
    fs.unlinkSync(path);
    api.sendMessage("✓ Bot की Profile Pic Change हो गई!", event.threadID, event.messageID);
  });
};