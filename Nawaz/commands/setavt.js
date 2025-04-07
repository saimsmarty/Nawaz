module.exports.config = {
  name: "setavt",
  version: "1.0.1",
  hasPermssion: 2,
  credits: "Nawaz Boss",
  description: "Reply image with +setavt to change bot profile picture",
  commandCategory: "admin",
  usages: "[reply image]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  const fs = require("fs-extra");
  const axios = require("axios");

  if (!event.messageReply || event.messageReply.attachments.length == 0) {
    return api.sendMessage("Reply किसी Photo पे कर के +setavt लिख भाई!", event.threadID, event.messageID);
  }

  const imgURL = event.messageReply.attachments[0].url;
  const imgPath = __dirname + "/cache/avt.jpg";

  const response = await axios.get(imgURL, { responseType: 'arraybuffer' });
  fs.writeFileSync(imgPath, Buffer.from(response.data, "utf-8"));

  api.changeAvatar(fs.createReadStream(imgPath), (err) => {
    if (err) return api.sendMessage("DP Change Failed!", event.threadID, event.messageID);
    fs.unlinkSync(imgPath);
    api.sendMessage("» Bot DP Change हो गया Boss!", event.threadID, event.messageID);
  });
};