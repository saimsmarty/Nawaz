const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "setavt",
    version: "1.0",
    author: "Nawaz Boss",
    countDown: 5,
    role: 2,
    description: "Bot का Avatar (Profile Pic) Change करें",
    category: "owner",
    guide: "{pn} reply photo या link दो"
  },

  onStart: async function ({ api, event, args }) {
    const link = args[0] || (event.messageReply?.attachments[0]?.url);

    if (!link) return api.sendMessage("Please photo reply करो या link दो!", event.threadID, event.messageID);

    const path = __dirname + "/cache/avatar.png";

    try {
      const res = await axios.get(link, { responseType: "arraybuffer" });
      fs.writeFileSync(path, res.data);

      api.changeAvatar(fs.createReadStream(path), (err) => {
        if (err) return api.sendMessage("Avatar change failed!", event.threadID, event.messageID);
        return api.sendMessage("Bot Avatar changed successfully!", event.threadID, event.messageID);
      });
    } catch (e) {
      return api.sendMessage("Invalid link या error आया!", event.threadID, event.messageID);
    }
  }
};