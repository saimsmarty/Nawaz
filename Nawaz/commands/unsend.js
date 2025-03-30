module.exports.config = {
    name: "unsend",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "Bot ke message ko unsend kare sirf react se",
    commandCategory: "system",
    usages: "React kare bina prefix ke unsend",
    cooldowns: 0,
    dependencies: {},
    noprefix: true // अब बिना prefix के ही चलेगा
};

module.exports.handleEvent = function ({ api, event }) {
    if (event.type !== "message_reaction") return;
    
    // सिर्फ 🫰 emoji पर react करने से unsend होगा
    if (event.reaction && event.reaction == "🫰") {
        api.getMessage(event.messageID, (err, info) => {
            if (err) return;
            
            // सिर्फ बॉट के भेजे हुए मैसेज unsend होंगे
            if (info.senderID == api.getCurrentUserID()) {
                api.unsendMessage(event.messageID);
            }
        });
    }
};

module.exports.run = function() {};