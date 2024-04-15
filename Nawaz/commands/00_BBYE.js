const fs = require("fs");
module.exports.config = {
  name: "bye",
    version: "2.1.1",
  hasPermssion: 0,
  credits: "𝐏𝐑𝐈𝐘𝐀𝐍𝐒𝐇𝐈 𝐊𝐀𝐔𝐑", 
  description: "Just Respond",
  commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = async ({ api, event, Users, Currencies, args, utils, client, global }) => {
  var name = await Users.getNameUser(event.senderID);
  var { threadID, messageID } = event;
  let react = event.body.toLowerCase();
  if(react.includes("bye") ||
     react.includes("BYE") || react.includes("Bye") || react.includes("bay") ||
react.includes("Bay") ||
react.includes("tc") ||     
react.includes("take care")) {
    var msg = {
        body: `${name} बाय बाय बाबू थोड़ा जल्दी आना।🥺👈`,attachment: fs.createReadStream(__dirname + `/noprefix/bbye.gif`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("👋", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = async ({ api, event, Currencies, args, utils, client, global }) => {

  }