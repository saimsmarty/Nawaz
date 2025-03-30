module.exports.config = {
    name: "unsend",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 (Modified by Nawaz Boss)",
    description: "React se ya reply se bot ke messages auto unsend kare",
    commandCategory: "system",
    usages: "React karo ya reply se unsend",
    cooldowns: 0
};

module.exports.handleEvent = function({ api, event }) {
    if (event.type === "message_reaction" && event.reaction === "😂") {
        api.unsendMessage(event.messageID);
    }
};

module.exports.run = function({ api, event, getText }) {
    if (event.messageReply && event.messageReply.senderID == api.getCurrentUserID()) {
        return api.unsendMessage(event.messageReply.messageID);
    } else {
        return api.sendMessage("Sirf bot ke messages unsend kiye ja sakte hain.", event.threadID, event.messageID);
    }
};