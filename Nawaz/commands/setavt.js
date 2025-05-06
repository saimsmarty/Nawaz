const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports.config = {
  name: "setavt",
  version: "2.0.0",
  hasPermission: 2,
  credits: "Nawaz Boss",
  description: "बॉट की DP (Avatar) बदलें",
  commandCategory: "admin",
  usages: "[reply image]",
  cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
  const { messageReply, threadID, messageID } = event;

  // ✅ Check: Reply किया है या नहीं
  if (!messageReply || !messageReply.attachments || messageReply.attachments.length === 0) {
    return api.sendMessage("कृपया किसी फोटो पर reply करके '+setavt' भेजें।", threadID, messageID);
  }

  const attachment = messageReply.attachments[0];
  if (attachment.type !== "photo") {
    return api.sendMessage("❌ सिर्फ़ फोटो reply करें, अन्य कुछ नहीं।", threadID, messageID);
  }

  const imgURL = attachment.url;
  const imgPath = path.join(__dirname, "cache", "newAvatar.jpg");

  try {
    // ✅ डाउनलोड करना
    const response = await axios.get(imgURL, { responseType: "stream" });
    const writer = fs.createWriteStream(imgPath);
    response.data.pipe(writer);

    writer.on("finish", async () => {
      const avatar = fs.createReadStream(imgPath);
      api.changeAvatar(avatar, async (err) => {
        fs.unlinkSync(imgPath); // फाइल डिलीट करो

        if (err) {
          console.error(err);
          return api.sendMessage("❌ बॉट की DP बदलने में दिक्कत आई।", threadID, messageID);
        }

        return api.sendMessage("✅ बॉट की प्रोफाइल फोटो बदल दी गई!", threadID, messageID);
      });
    });

    writer.on("error", (err) => {
      console.error(err);
      return api.sendMessage("❌ फोटो सेव करने में दिक्कत आई।", threadID, messageID);
    });

  } catch (error) {
    console.error(error);
    return api.sendMessage("❌ एरर आ गया, DP नहीं बदली।", threadID, messageID);
  }
};