const fs = require("fs");
module.exports.config = {
  name: "owner",
    version: "2.1.1",
  hasPermssion: 0,
  credits: "SHANKAR SUMAN", 
  description: "Just Respond",
  commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = async ({ api, event, Users, Currencies, args, utils, client, global }) => {
  var name = await Users.getNameUser(event.senderID);
  var { threadID, messageID } = event;
  let react = event.body.toLowerCase();
  if(react.includes("owner") ||
     react.includes("Owner") || react.includes("malik") || react.includes("OWNER") ||
react.includes("boss") ||
react.includes("Boss")) {
    var msg = {
        body: `${name} ये लो ऑनर इंफॉर्मेशन 👈
        🔰𝙊𝙒𝙉𝙀𝙍 𝙄𝙉𝙁𝙊🔰

  •❅──────✧❅✦❅✧──────❅•                                                   ˚                   ₊· ͟͟͞͞➳.ೃ࿐                                                     
     🅾🆆🅽🅴🆁 ❈ ◦•≫ 🦋⃝𓆩̬𝐍ɑ͜͡𝘄ɑ͜͡𝐳𓆪᭄___🩷🪽 ☜︎︎︎✰ 𝐉𝐈                            •*⁀.ೃ࿐.                            *:;,．       ★ ⌒ ☆                      ・:.,;*.                  *♡+:｡.｡　　                   ｡.｡:+♡* .             ▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱ .                     

𝐀𝐠𝐞 : 21

𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩 𝐖𝐢𝐭𝐡 : 𝕂𝕆𝕀 ℕ𝕀

𝐅𝐫𝐨𝐦 : 𝐁𝐀𝐑𝐄𝐋𝐘☆𝐔.𝐏

𝐒𝐭𝐮𝐝𝐲 : 𝐂𝐨𝐦𝐛𝐚𝐭 𝐀𝐧𝐝 𝐃𝐞𝐟𝐞𝐧𝐜𝐞 - 𝐇𝐨𝐛𝐛𝐲 - 𝐏𝐫𝐨𝐠𝐫𝐚𝐦𝐢𝐧𝐠 𝐀𝐧𝐝 𝐂𝐨𝐝𝐢𝐧𝐠

𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐋𝐢𝐧𝐤 :https://www.facebook.com/itznawaz007?mibextid=ZbWKwL

𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 : +918126516080  

 нαм внι нση gαү вεωαғα кαнεη кιsι кι zιη∂αgι мα!❤🙂♣️`,attachment: fs.createReadStream(__dirname + `/noprefix/owner.gif`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("☀️", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = async ({ api, event, Currencies, args, utils, client, global }) => {

  }