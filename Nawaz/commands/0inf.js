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

☄️Bot Name︎︎︎☄️ ⚔  ${global.config.BOTNAME}

🔥Bot Admin🔥☞︎︎︎ 𒁍⃝𓆩̬𝐍ɑ͜͡𝘄ɑ͜͡𝐳𓆪᭄ ☜︎︎︎✰ 

🙈bot owner facebook id link🙈➪  https://www.facebook.com/itznawaz007?mibextid=ZbWKwL 💞🕊️

you can directly WhatsApp him on - 8126516080 

👋For Any Kind Of Help Contact On instagram  Username 👉 https://instagram.com/itz_nawaz__007?utm_source=qr&igshid=NGExMmI2YTkyZg%3D%3D

✧══════•❁❀❁•══════✧

🌸Bot Prefix🌸☞︎︎︎+☜︎︎︎✰ +
${global.config.PREFIX}

♥️Bot Owner♥️ ☞︎︎︎☜︎︎︎✰ ıı⭐🌟 Nawaz Ahmad 🌟⭐ıllı

🥳UPTIME🥳

🌪️Today is🌪️ ☞︎︎︎☜︎︎︎✰ ${juswa} 

⚡Bot is running⚡ ${hours}:${minutes}:${seconds}.

✅Thanks for using ${global.config.BOTNAME} Bot🖤


🦢🍒•••ꞪɛᏒɛ ɪʂ ɮ❍┼ ❍ωɳɜɽ ɳaʍɜ•••🌷💞
┏━🕊️━━°❀•°:🎀🧸💙🧸🎀:°•❀°━━💞━┓
🌸✦✧✧✧✧✰🍒𒁍⃝𓆩̬𝐍ɑ͜͡𝘄ɑ͜͡𝐳𓆪᭄🌿✰✧✧✧✧✦🌸
┗━🕊️━━°❀•°:🎀🧸💙🧸🎀:°•❀°━━💞━┛


`,attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.jpg")).on("close",() => callback());
   };