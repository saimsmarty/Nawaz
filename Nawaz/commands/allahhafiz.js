 const fs = require("fs");
module.exports.config = {
	name: "bye",
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
	if(react.includes("Bye") ||
     react.includes("By") ||
     react.includes("bye") || 
react.includes("Allah Hafiz")) {
		var msg = {
				body: "★𝐁𝐘𝐞 , 𝐀𝐥𝐥𝐚𝐡 𝐇𝐚𝐟𝐢𝐳 𝐁𝐚𝐛𝐮 😍𓆪᭄🩷🪽✦`🥀🦋",
				attachment: fs.createReadStream(__dirname + `/noprefix/Nawaz.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😍", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

      }
