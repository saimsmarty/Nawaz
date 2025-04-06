const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "setavt",
    version: "1.0",
    author: "Converted by NawazBoss",
    role: 2,
    shortDescription: {
      en: "Change bot profile picture",
    },
    category: "owner",
    guide: {
      en: "{pn} reply image or {pn} url"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    let path = __dirname + `/cache/avatar.png`;

    if (event.type == "message_reply" && event.messageReply.attachments[0]?.type == "photo") {
      const imgURL = event.messageReply.attachments[0].url;
      const response = await axios.get(imgURL, { responseType: "arraybuffer" });
      fs.writeFileSync(path, Buffer.from(response.data, "utf-8"));
    } else if (args[0]) {
      const imgURL = args[0];
      const response = await axios.get(imgURL, { responseType: "arraybuffer" });
      fs.writeFileSync(path, Buffer.from(response.data, "utf-8"));
    } else {
      return message.reply("❌ | Reply image ya image url do");
    }

    api.changeAvatar(fs.createReadStream(path), event.threadID, async (err) => {
      fs.unlinkSync(path);
      if (err) return message.reply("❌ | Failed to change avatar");
      return message.reply("✅ | Avatar changed successfully");
    });
  }
};