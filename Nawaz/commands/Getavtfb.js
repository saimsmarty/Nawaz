const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "setavt",
    aliases: ["changeavt", "setavatar"],
    version: "1.0",
    author: "Converted by NawazBoss",
    role: 2,
    shortDescription: "Change bot profile picture",
    longDescription: "Change the avatar/profile picture of the bot",
    category: "owner",
    guide: "{pn} reply to image or {pn} imageURL"
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID, senderID, type, messageReply } = event;

    let imagePath = __dirname + `/cache/avatar.jpg`;

    if (messageReply && messageReply.attachments.length > 0) {
      const attachment = messageReply.attachments[0];
      if (attachment.type === "photo") {
        const url = attachment.url;
        const response = await axios.get(url, { responseType: "arraybuffer" });
        fs.writeFileSync(imagePath, Buffer.from(response.data, "utf-8"));
      } else return api.sendMessage("Reply image only.", threadID, messageID);
    } else if (args[0]) {
      try {
        const response = await axios.get(args[0], { responseType: "arraybuffer" });
        fs.writeFileSync(imagePath, Buffer.from(response.data, "utf-8"));
      } catch {
        return api.sendMessage("Invalid Image URL.", threadID, messageID);
      }
    } else return api.sendMessage("Reply image or provide image URL.", threadID, messageID);

    api.changeAvatar(fs.createReadStream(imagePath), err => {
      if (err) return api.sendMessage("Failed to change avatar.", threadID, messageID);
      fs.unlinkSync(imagePath);
      return api.sendMessage("Bot Avatar Changed Successfully!", threadID, messageID);
    });
  }
};