const fs = require("fs");
module.exports.config = {
  name: "allah hafiz",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩", 
  description: "hihihihi",
  commandCategory: "no prefix",
  usages: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
let react = event.body.toLowerCase();
 if (react.includes("Byy") ||  react.includes("Allah hafiz") || react.includes("byy") || 
react.includes("allah hafiz")) {
    var msg = {
        body: "𝐁𝐘𝐞 , 𝐀𝐥𝐥𝐚𝐡 𝐇𝐚𝐟𝐢𝐳 𝐁𝐚𝐛𝐮 😍",
        attachment: 
fs.createReadStream(__dirname + `/noprefix/bye.gif`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😍", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
