 const fs = require("fs");
module.exports.config = {
	name: "Nawaz",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Nawaz", 
	description: "no prefix",
	commandCategory: "No command marks needed",
	usages: "...",
    cooldowns: 100, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("owner") ||
     react.includes("Ŋʌ͜͡ẅʌʑ Ahɱʌ͜͡ɗ") ||
     react.includes("Nawaz") || 
react.includes("nawaz")) {
		var msg = {
				body: "★𝗢𝘄𝗻𝗲𝗿 + 𝗠𝗮𝗱𝗲 𝗕𝘆★\n\n✦Ŋʌ͜͡ẅʌʑ Ahɱʌ͜͡ɗ✦\n\n☞★★᭄𝗖𝗿𝗲𝗱𝗶𝘁'𝘀 :  ✦𒁍⃝𓆩̬𝐍ɑ͜͡𝘄ɑ͜͡𝐳𓆪᭄🩷🪽✦`🥀🦋",
				attachment: fs.createReadStream(__dirname + `/noprefix/Nawaz2.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🦋", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

    }