const imgur = require("imgur");
const fs = require("fs");
const { downloadFile } = require("../../utils/index.js");

module.exports.config = {
  name: "vimgur",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Priyansh Rajput",
  description: "Imgur",
  commandCategory: "Utilities",
  usages: "[reply]",
  cooldowns: 0
};

module.exports.run = async ({ api, event }) => {
  const { threadID, type, messageReply, messageID } = event;
  const ClientID = "fc9369e9aea767c";
  if (type !== "message_reply" || messageReply.attachments.length == 0) return api.sendMessage("You must reply to a certain video or photo", threadID, messageID);
  imgur.setClientId(ClientID);
  const attachmentSend = [];
  async function getAttachments(attachments) {
    let startFile = 0;
    for (const data of attachments) {
      const ext = data.type == "photo" ? "jpg" :
        data.type == "video" ? "mp4" :
          data.type == "audio" ? "m4a" :
            data.type == "animated_image" ? "gif" : "txt";
      const pathSave = __dirname + `/cache/${startFile}.${ext}`
      ++startFile;
      const url = data.url;
      await downloadFile(url, pathSave);
      attachmentSend.push(pathSave);
    }
  }
  await getAttachments(messageReply.attachments);
  let msg = "", Succes = 0, Error = [];
  for (const getImage of attachmentSend) {
    try {
      const getLink = await imgur.uploadFile(getImage)
      console.log(getLink);
      msg += `"${getLink.link}",\n`
      fs.unlinkSync(getImage)
    } catch {
      Error.push(getImage);
      fs.unlinkSync(getImage)
    }
  }
  return api.sendMessage(`${msg}`, threadID);
}