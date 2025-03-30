module.exports.config = {
    name: "unsend",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "Bot owner react karke ya +unsend likhne par message unsend kare",
    commandCategory: "system",
    usages: "React ya +unsend likhne par unsend",
    cooldowns: 0
};

module.exports.languages = {
    "vi": {
        "returnCant": "Không thể gỡ tin nhắn của người khác.",
        "missingReply": "Hãy reply tin nhắn cần gỡ."
    },
    "en": {
        "returnCant": "Kisi Aur Ka Msg M Kese Unsend Karu.",
        "missingReply": "Mere Jis Msg ko Unsend Karna Hai Usme Reply Karke Likkho."
    }
};

// Bot owner ke react se unsend
module.exports.handleEvent = function ({ api, event }) {
    const botOwnerID = "100069136731529"; // यहाँ अपना Facebook ID डालो
    if (event.type === "message_reaction") {
        if (event.senderID === botOwnerID && event.messageID) {
            api.getMessage(event.messageID, (err, info) => {
                if (!err && info.senderID === api.getCurrentUserID()) {
                    return api.unsendMessage(event.messageID);
                }
            });
        }
    }
};

// +unsend likhne se unsend
module.exports.run = function ({ api, event, getText }) {
    if (event.body === "+unsend" && event.messageReply) {
        if (event.messageReply.senderID != api.getCurrentUserID()) {
            return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);
        }
        return api.unsendMessage(event.messageReply.messageID);
    }
};