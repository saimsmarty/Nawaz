const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");

module.exports.config = {
  name: "setavt",
  version: "1.0.0",
  hasPermission: 2, // सिर्फ़ एडमिन चला सके
  credits: "Nawaz Boss",
  description: "बॉट की प्रोफाइल पिक्चर बदलो",
  commandCategory: "admin",
  usages: "[reply image]",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID, messageReply, senderID } = event;

  if (!messageReply || !messageReply.attachments || messageReply.attachments.length === 0) {
    return api.sendMessage("कृपया किसी इमेज पर reply करके '+setavt' भेजें।", threadID, messageID);
  }

  const attachment = messageReply.attachments[0];
  if (attachment.type !== "photo") {
    return api.sendMessage("सिर्फ़ फोटो ही स्वीकार्य है!", threadID, messageID);
  }

  const imageUrl = attachment.url;
  const imgPath = path.join(__dirname, "cache", `avatar.jpg`);

  try {
    const response = await axios.get(imageUrl, { responseType: "stream" });
    const writer = fs.createWriteStream(imgPath);
    response.data.pipe(writer);

    writer.on("finish", async () => {
      const imageStream = fs.createReadStream(imgPath);
      api.changeAvatar(imageStream, (err) => {
        fs.unlinkSync(imgPath);
        if (err) return api.sendMessage("❌ प्रोफाइल पिक्चर बदलने में समस्या हुई।", threadID);
        api.sendMessage("✅ बॉट की प्रोफाइल पिक्चर सफलतापूर्वक बदल दी गई!", threadID);
      });
    });

    writer.on("error", () => {
      fs.unlinkSync(imgPath);
      api.sendMessage("❌ इमेज सेव नहीं हो पाई।", threadID);
    });

  } catch (error) {
    console.error(error);
    api.sendMessage("❌ कोई एरर आ गई।", threadID);
  }
};