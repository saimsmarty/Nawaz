module.exports.config = {
    name: "unsend",
    version: "3.0.0",
    hasPermssion: 0,
    credits: "Priyansh Rajput (Modified by Nawaz Boss)",
    description: "React 🫰 se Auto Unsend kare bot ke messages.",
    commandCategory: "system",
    usages: "Just react 🫰 to bot messages to unsend them.",
    cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
    if (event.type !== "message_reaction") return; // सिर्फ reaction event को allow करना
    const { messageID, threadID, reaction, userID } = event;

    if (reaction !== "🫰") return; // अगर reaction 🫰 नहीं है तो कुछ मत करो

    try {
        api.getMessageInfo(messageID, (err, info) => {
            if (err) return console.error(err);
            
            // सिर्फ बॉट के भेजे गए मैसेज ही हटाएंगे
            if (info.senderID === api.getCurrentUserID()) {
                api.unsendMessage(messageID);
            }
        });
    } catch (error) {
        console.error("Error in unsend:", error);
    }
};

module.exports.run = function() {};