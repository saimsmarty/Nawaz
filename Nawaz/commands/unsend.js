module.exports.config = {
    name: "unsend",
    version: "2.0.1",
    hasPermssion: 0,
    credits: "N9W9Z H9CK3R",
    description: "🫰 React se Auto Unsend ho jayega",
    commandCategory: "system",
    usages: "🫰 React to bot message to unsend",
    cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
    if (event.type !== "message_reaction") return;
    
    const { messageID, senderID, threadID, userID, reaction } = event;

    // अगर Reaction 🫰 नहीं है, तो कुछ मत करो
    if (reaction !== "🫰") return;

    // सिर्फ बॉट के भेजे गए मैसेज ही हटेंगे
    api.getMessageInfo(messageID, (err, info) => {
        if (err) return;
        
        // अगर जिस मैसेज पर React हुआ वो बॉट का है, तो Unsend करो
        if (info.senderID === api.getCurrentUserID()) {
            api.unsendMessage(messageID);
        }
    });
};

module.exports.run = function() {};