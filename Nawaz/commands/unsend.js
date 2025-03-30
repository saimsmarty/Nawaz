module.exports.config = {
    name: "unsend",
    version: "1.0.3",
    hasPermssion: 0,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 (Modified by Nawaz Boss)",
    description: "Bot ke messages ko unsend karne ka system (prefix/no-prefix/react)",
    commandCategory: "system",
    usages: "[Reply to bot's message] ya react 😂",
    cooldowns: 0
};

// No Prefix ke liye handleEvent use kiya gaya hai
module.exports.handleEvent = function({ api, event }) {
    if (event.type === "message_reaction" && event.reaction === "😂") {
        if (event.messageID) {
            return api.unsendMessage(event.messageID);
        }
    }
    if (event.body && (event.body.toLowerCase() === "uns" || event.body.toLowerCase() === "unsend")) {
        if (event.messageReply && event.messageReply.senderID == api.getCurrentUserID()) {
            return api.unsendMessage(event.messageReply.messageID);
        }
    }
};

module.exports.run = function({ api, event, getText }) {
    if (event.messageReply && event.messageReply.senderID == api.getCurrentUserID()) {
        return api.unsendMessage(event.messageReply.messageID);
    } else {
        return api.sendMessage("Sirf bot ke messages unsend kiye ja sakte hain.", event.threadID, event.messageID);
    }
};