module.exports.config = {
    name: "unsend",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "Auto Unsend bot messages",
    commandCategory: "system",
    usages: "unsend",
    cooldowns: 0
};

module.exports.handleEvent = function({ api, event }) {
    // अगर कोई बॉट के मैसेज पर 🫰 react करता है, तो वह मैसेज Unsend हो जाएगा।
    if (event.type === "message_reaction" && event.reaction === "🫰") {
        api.unsendMessage(event.messageID);
    }
};

module.exports.run = function({ api, event, getText }) {
    if (event.type !== "message_reply") return api.sendMessage(getText("missingReply"), event.threadID, event.messageID);
    if (event.messageReply.senderID !== api.getCurrentUserID()) return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);
    
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