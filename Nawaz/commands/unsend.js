module.exports.config = { name: "auto_unsend", version: "1.0.0", hasPermssion: 0, credits: "Nawaz Boss", description: "Auto unsend bot's message when reacted with 🫰", commandCategory: "system", usages: "Automatic", cooldowns: 0 };

module.exports.handleEvent = async function({ api, event }) { if (event.type !== "message_reaction") return;

// Check if the reaction is 🫰 and the message is from the bot itself
if (event.reaction == "🫰") {
    api.getMessage(event.messageID, (err, info) => {
        if (err) return;
        if (info.senderID === api.getCurrentUserID()) {
            api.unsendMessage(event.messageID);
        }
    });
}

};

module.exports.run = function() { return; };

