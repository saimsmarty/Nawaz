const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "setavt",
    version: "1.0",
    role: 2,
    author: "Modified by ChatGPT",
    description: "Change bot profile picture",
    category: "owner",
    guide: "{pn} reply photo ya link se bhi chalega"
  },

  onStart: async function ({ api, event, args }) {
    const link = args[0] || (event.messageReply?.attachments[0]?.url);

    if (!link) return api.sendMessage("Photo ka link do ya photo reply karo.", event.threadID, event.messageID);

    const path = __dirname + "/cache/avatar.png";
    const res = await axios.get(link, { responseType: "arraybuffer" });
    fs.writeFileSync(path, res.data);

    api.changeAvatar(fs.createReadStream(path), err => {
      if (err) return api.sendMessage("Avatar change failed!", event.threadID, event.messageID);
      return api.sendMessage("Bot Avatar changed successfully!", event.threadID, event.messageID);
    });
  }
};