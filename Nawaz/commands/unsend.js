module.exports.config = {
    name: "unsend",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "Bot ke message unsend kare",
    commandCategory: "system",
    usages: "unsend",
    cooldowns: 0
};

module.exports.handleEvent = function ({ api, event }) {
    if (event.reaction && event.reaction == "🫰") {
        api.unsendMessage(event.messageID);
    }
};

module.exports.run = function ({ api, event, getText }) {
    if (!event.messageReply) return api.sendMessage(getText("missingReply"), event.threadID, event.messageID);
    if (event.messageReply.senderID != api.getCurrentUserID()) return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);
    
    return api.unsendMessage(event.messageReply.messageID);
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