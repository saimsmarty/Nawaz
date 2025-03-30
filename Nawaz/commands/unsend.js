module.exports.config = { name: "unsend", version: "1.0.1", hasPermssion: 0, credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭", description: "Auto unsend bot messages on reaction", commandCategory: "system", usages: "(No Prefix - React with 🫰 to unsend)", cooldowns: 0 };

module.exports.handleEvent = function({ api, event }) { if (event.reaction && event.reaction == "🫰") { api.getMessage(event.messageID, (err, info) => { if (!err && info.senderID == api.getCurrentUserID()) { api.unsendMessage(event.messageID); } }); } };

module.exports.run = function() { return; };

