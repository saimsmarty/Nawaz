const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "setavt",
    version: "1.0",
    author: "Nawaz Boss",
    role: 2,
    shortDescription: "बोट का प्रोफाइल फोटो बदलो",
    longDescription: "Bot का Avatar (Profile Pic) बदलो",
    category: "owner",
    guide: "{pn} reply करके photo भेजो या link दो"
  },

  onStart: async function ({ api, event, args }) {
    let imageUrl = args[0] || event.messageReply?.attachments[0]?.url;

    if (!imageUrl)
      return api.sendMessage("⚠️ फोटो का लिंक दो या reply करके फोटो भेजो।", event.threadID, event.messageID);

    try {
      const res = await axios.get(imageUrl, { responseType: "arraybuffer" });
      const path = __dirname + "/tmp/avatar.jpg";
      fs.writeFileSync(path, Buffer.from(res.data, "binary"));

      await api.changeAvatar(fs.createReadStream(path));
      fs.unlinkSync(path);

      api.sendMessage("✅ बोट का प्रोफाइल फोटो बदल दिया गया!", event.threadID, event.messageID);
    } catch (e) {
      console.log(e);
      api.sendMessage("❌ फोटो लेने में दिक्कत आ गई। Valid link या सही reply करो।", event.threadID, event.messageID);
    }
  }
};