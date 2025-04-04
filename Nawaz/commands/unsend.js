module.exports.config = {
  name: "unsend",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "Owner ke liye no prefix unsend, dusre ke liye prefix",
  commandCategory: "noprefix",
  usages: "Owner: 'unse' ya 'unsend', Users: '+unsend'",
  cooldowns: 0
};

module.exports.languages = {
  "en": {
    "returnCant": "Kisi aur ka msg m kaise unsend karu?",
    "missingReply": "Reply karo us msg ko jise unsend karwana hai."
  }
};

const botOwnerID = "100069136731529"; // <-- Apna ID yaad se daal

module.exports.handleEvent = function ({ api, event }) {
  const { body, senderID, messageReply, threadID, messageID } = event;

  if (!body || !messageReply) return;

  const lowerBody = body.toLowerCase();

  // --- Owner ke liye no prefix "unsend" ya "unse"
  if (senderID === botOwnerID && (lowerBody === "unsend" || lowerBody === "uns")) {
    if (messageReply.senderID != api.getCurrentUserID()) return;
    return api.unsendMessage(messageReply.messageID);
  }

  // --- Dusre users ke liye "+unsend"
  if (lowerBody === "+unsend") {
    if (messageReply.senderID != api.getCurrentUserID()) {
      return api.sendMessage(module.exports.languages["en"]["returnCant"], threadID, messageID);
    }
    return api.unsendMessage(messageReply.messageID);
  }
};

module.exports.run = function () {};