module.exports.config = {
	name: "info",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
	description: "approve ",
	description: "Admin and Bot info.",
	commandCategory: "...",
	cooldowns: 1,
	dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
var juswa = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【HH:mm:ss】");
var link =                                     
["https://i.ibb.co/4KN3RBk/image.jpg", "https://i.imgur.com/ASE1HvK.jpg", "https://i.imgur.com/psmkH2h.jpg", "https://i.imgur.com/fYkMR8R.jpg", "https://i.imgur.com/GXznznA.jpg", "https://i.imgur.com/wtmMQRP.jpg", "https://i.imgur.com/bSleqqK.jpg"];
var callback = () => api.sendMessage({body:` ╾━╤デ╦︻(▀̿Ĺ̯▀̿ ̿)🇮🇳 𝐀𝐃𝐌𝐈𝐍 𝐀𝐍𝐃 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 🇮🇳 
(⌐▀͡ ̯ʖ▀)︻̷┻̿═━一-

☄️𝐁๏𝐓 𝐍ʌ𝐌ɘ☄️ ⚔  ${global.config.BOTNAME}

🔥𝐁๏𝐓 𝐀ɗ𝐌īī𝐍🔥☞︎︎︎ 𒁍⃝𓆩̬𝐍ɑ͜͡𝘄ɑ͜͡𝐳𓆪᭄●🦋• ☜︎︎︎✰ 

🙈𝐁๏𝐓 ❍ꪝ𝐍ɘ𝐑 𝐅ʌ𝐂ɘ𝐁๏๏𝐊 𝐈ɗ 𝐋īīɴ𝐊🙈➪  https://www.facebook.com/N9W9Z.1NS1D3 💞🕊️

𝐘๏𝐔 𝐂ʌ𝐍 𝐃īī𝐑ɘCʈ𝐋ƴ 𝐖Hʌ𝐓s𝐀p𝐏 ┣┫īī𝐌 ❍𝐍 - +918191****** 

👋𝐅๏𝐑 𝐀ɴ𝐘 𝐊īī𝐍ɗ ❍ʆ ┣┫ɘɭ𝐏 𝐂๏ɴ𝐓ʌC𝐓 ๏𝐍 𝐈ɴ𝐒ʈʌ𝐆ɽʌ𝐌 𝐔sɘɽ𝐍ʌ𝐌ɘ 👉 https://instagram.com/itz_nawaz__07

✧══════•❁❀❁•══════✧

🌸𝐁๏𝐓 𝐏ɽɘ𝐅īīꭗ🌸☞︎︎︎+☜︎︎︎✰ +
${global.config.PREFIX}

♥️𝐁๏𝐓 ❍ꪝ𝐍ɘ𝐑♥️ ☞︎︎︎☜︎︎︎✰ ıı⭐🌟 ϻʀ᭄ꔰ『巛Nāꪝāʑ』ꪹ٭ ꔰ命࿐ 🌟⭐ıllı

🥳𝐔𝐏𝐓𝐈𝐌𝐄🥳

🌪️𝐓๏𝐃ʌƴ 𝐈s🌪️ ☞︎︎︎☜︎︎︎✰ ${juswa} 

⚡𝐁๏𝐓 𝐈s 𝐑𝐮𝐍ŋīīɴ𝐆⚡ ${hours}:${minutes}:${seconds}.

✅T𝐓H𝐀ɴ𝐊s 𝐅๏𝐑 𝐔sīī𝐍ʛ ${global.config.BOTNAME} 𝐁๏𝐓🖤


🦢🍒•••┣┫ɘ𝐑ɘ 𝐈s 𝐁๏𝐓 ❍ꪝ𝐍ɘ𝐑 𝐍ʌ𝐌ɘ•••🌷💞
┏━🕊️━━°❀•°:🎀🧸💙🧸🎀:°•❀°━━💞━┓
🌸✦✧✧✧✧✰🍒𒁍⃝𓆩̬𝐍ɑ͜͡𝘄ɑ͜͡𝐳𓆪᭄🦋•✰✧✧✧✧✦🌸
┗━🕊️━━°❀•°:🎀🧸💙🧸🎀:°•❀°━━💞━┛


`,attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.jpg")).on("close",() => callback());
   };