const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const { downloadFile } = require("../../utils/index.js");

module.exports.config = {
  name: "imgur",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "Upload images/videos to Imgur using OAuth 2.0",
  commandCategory: "Utilities",
  usages: "[reply]",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  const { threadID, type, messageReply, messageID } = event;
  const accessToken = "053d1e88a4339a154bbeadbfaa4fe6b654e2ef44" ; // Replace with your Imgur OAuth token

  // Check if the message is a reply with an attachment
  if (type !== "message_reply" || !messageReply.attachments.length) {
    return api.sendMessage("⚠️ You must reply to a photo or video!", threadID, messageID);
  }

  const attachmentSend = [];

  // Function to download attachments
  async function getAttachments(attachments) {
    let startFile = 0;
    for (const data of attachments) {
      const ext = data.type === "photo" ? "jpg" :
        data.type === "video" ? "mp4" :
        data.type === "audio" ? "m4a" :
        data.type === "animated_image" ? "gif" : "txt";
      const pathSave = `/tmp/${startFile}.${ext}`; // Use /tmp/ for Render
      startFile++;
      await downloadFile(data.url, pathSave);
      attachmentSend.push(pathSave);
    }
  }

  // Function to upload files to Imgur
  async function uploadToImgur(filePath) {
    const form = new FormData();
    form.append("image", fs.createReadStream(filePath));

    try {
      const response = await axios.post("https://api.imgur.com/3/upload", form, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Use OAuth token
          ...form.getHeaders(),
        },
      });
      return response.data.data.link;
    } catch (error) {
      console.error("❌ Error uploading to Imgur:", error.response?.data || error.message);
      return null;
    }
  }

  // Download attachments
  await getAttachments(messageReply.attachments);

  let msg = "";
  let successCount = 0;
  let failedFiles = [];

  // Upload each attachment to Imgur
  for (const file of attachmentSend) {
    const imgurLink = await uploadToImgur(file);
    if (imgurLink) {
      msg += ${imgurLink}\n`;
      successCount++;
    } else {
      failedFiles.push(file);
    }
    fs.unlinkSync(file); // Delete file after uploading
  }

  // Send the result
  if (msg) {
    api.sendMessage(`${successCount}:\n${msg}`, threadID);
  } else {
    api.sendMessage("❌ Failed to upload files to Imgur.", threadID);
  }
};