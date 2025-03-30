module.exports.config = {
    name: "unsend",
    version: "3.1.0",
    hasPermssion: 0,
    credits: "Priyansh Rajput ",
    description: "React 🫰 se Auto Unsend kare bot ke messages.",
    commandCategory: "system",
    usages: "Just react 🫰 to bot messages to unsend them.",
    cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
    if (event.type !== "message_reaction") return;
    const { messageID, reaction, userID } = event;

    
    if (reaction !== "🫰") return;

    try {
       
        api.getMessageInfo(messageID, (err, info) => {
            if (err) return console.error(err);
            if (info.senderID === api.getCurrentUserID()) {
                api.unsendMessage(messageID);
            }
        });
    } catch (error) {
        console.error("Error in unsend:", error);
    }
};

module.exports.run = function() {}; // Empty run function, क्योंकि सिर्फ Reaction से ही चलेगा