module.exports = {
  config: {
    name: "linkAutoDownload",
    version: "1.3.1",
    hasPermssion: 0,
    credits: "Nawaz Boss",
    description: "Automatically detects links in messages and downloads the file.",
    commandCategory: "Utilities",
    usages: "",
    cooldowns: 5,
  },
  
  run: async function ({ events, args }) {},

  handleEvent: async function ({ api, event }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const { alldown } = require("arif-babu-media");

    const content = event.body ? event.body.trim() : "";
    if (!content.startsWith("https://")) return;

    try {
      api.setMessageReaction("⏳", event.messageID, () => {}, true);

      // लिंक से वीडियो डाउनलोड करने की कोशिश
      const data = await alldown(content);
      if (!data || !data.data) {
        return api.sendMessage("⚠ वीडियो डाउनलोड करने में समस्या आई!", event.threadID, event.messageID);
      }

      const { high, title } = data.data;
      const filePath = `${__dirname}/cache/auto.mp4`;

      // वीडियो डाउनलोड करना
      const videoBuffer = (await axios.get(high, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(filePath, Buffer.from(videoBuffer, "utf-8"));

      api.setMessageReaction("📥", event.messageID, () => {}, true);

      return api.sendMessage(
        {
          body: `🎬 **वीडियो डाउनलोड हो गया!**\n\n📌 **नाम:** ${title}\n👑 **Powered by Nawaz Boss**\n\n✅ **इस्तेमाल के लिए तैयार!**`,
          attachment: fs.createReadStream(filePath),
        },
        event.threadID,
        event.messageID
      );
    } catch (error) {
      console.error("⛔ डाउनलोड एरर:", error);
      return api.sendMessage("❌ डाउनलोड फेल! कुछ गड़बड़ हो गई।", event.threadID, event.messageID);
    }
  },
};