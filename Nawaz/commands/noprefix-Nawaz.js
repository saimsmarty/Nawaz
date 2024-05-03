 const fs = require("fs");
module.exports.config = {
	name: "Nwz",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Arun", 
	description: "no prefix",
	commandCategory: "no prefix",
	usages: "...",
    cooldowns: 100, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("link") ||
     react.includes("Messenger") || 
react.includes("group")) {
		var msg = {
				body: "💞𝗝𝗼𝗶𝗻 𝗢𝘂𝗿 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗚𝗿𝗼𝘂𝗽😋 \n\n🦋⃝Nʌ͜͡ᤐʌ͜͡ʑ ★⃝Ƙʌ 👑⃝𝐀s┣┫ɩƴΛɳΛ✨💛____🦋)) 😋https://m.me/j/Aba_mVeVfIAMB6hf/`❤️ ",
				attachment: fs.createReadStream(__dirname + `/noprefix/Nwz.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🫥", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

    }
