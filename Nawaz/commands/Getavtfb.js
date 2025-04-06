const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "setavt",
    aliases: ["changeavt", "setavatar"],
    version: "1.0",
    author: "Modified By Nawaz Boss",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Change bot avatar"
    },
    longDescription: {
      en: "Change bot's profile picture using image URL or replying image"
    },
    category: "owner",
    guide: {
      en: "{pn} [image url] | Reply to image"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const imageURL = (args[0] || "").startsWith("http") ? args[0] : event.messageReply?.attachments[0]?.url;

    if (!imageURL)
      return message.reply("Please provide image url or reply to any image!");

    try {
      const response = await axios.get(imageURL, { responseType: "arraybuffer" });

      const path = __dirname + "/cache/avatar.png";
      fs.writeFileSync(path, Buffer.from(response.data, "binary"));

      await api.changeAvatar(fs.createReadStream(path));

      fs.unlinkSync(path);

      message.reply("✅ | Bot avatar changed successfully!");
    } catch (err) {
      console.log(err);
      message.reply("❌ | Failed to change avatar.");
    }
  }
};