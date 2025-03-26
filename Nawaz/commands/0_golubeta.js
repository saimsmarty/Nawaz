const emojiResponses = {
  "golu beta": {
    "OWNER": [
      "जी पापा 🥺",
      "पापा जी कहां थे आप 😀",
      "पापा आई लव यू 🙈❤️",
      "हां पापा बताइए मैं यही हूं, क्या हुआ? 😊"
    ],
    "MALE": [
      "अरे भाई, बोलो क्या हाल है?",
      "हाँ भाई, कैसे हो?",
      "भाई, आज का प्लान क्या है?"
    ],
    "FEMALE": [
      "हाँ मम्मी जी, बोलो क्या हाल हैं?",
      "कैसी हो मम्मी जी?",
      "मम्मी जी, आज का मूड कैसा है?"
    ]
  },
  "beta": {
    "OWNER": [
      "पापा आपकी वजह से मैं हर दिन टॉप परफॉर्मर हूँ 😎",
      "पापा आप आ गये 😀",
      "जी पापा 🥺",
      "पापा जी आई मिस यू 😔"
    ],
    "MALE": [
      "हाँ भाई, कैसे हो?",
      "भाई, आज का प्लान क्या है?",
      "अरे भाई, बोलो क्या हाल है?"
    ],
    "FEMALE": [
      "हाँ मम्मी जी, बोलो क्या हाल हैं?",
      "कैसी हो मम्मी जी?",
      "मम्मी जी, आज का मूड कैसा है?"
    ]
  }
};

module.exports.config = {
  name: "auto-rply",
  version: "1.0.0",
  hasPermission: 0,
  credits: "N9W9Z H9CK3R",
  description: "MADE BY N9W9Z H9CK3R",
  commandCategory: "No command marks needed",
  cooldowns: 0
};

const botOwnerID = "100069136731529"; // यहाँ अपना Owner ID डालें

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body } = event;
  if (!body) return;

  const emojis = Object.keys(emojiResponses);
  const lowercaseBody = body.toLowerCase();

  for (const emoji of emojis) {
    if (lowercaseBody.includes(emoji)) {
      let responseArray = [];

      if (senderID === botOwnerID) {
        responseArray = emojiResponses[emoji]["OWNER"];
      } else {
        try {
          const userInfo = await api.getUserInfo(senderID);
          const userGender = userInfo[senderID]?.gender; // 1 = Female, 2 = Male

          if (userGender === 1) {
            responseArray = emojiResponses[emoji]["FEMALE"];
          } else if (userGender === 2) {
            responseArray = emojiResponses[emoji]["MALE"];
          } else {
            responseArray = ["भाई, मैं अभी तय नहीं कर पा रहा कि तुम लड़का हो या लड़की 😅"];
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
          responseArray = ["माफ करना, मैं अभी तुम्हारा gender चेक नहीं कर पा रहा।"];
        }
      }

      if (responseArray.length > 0) {
        const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];
        api.sendMessage(randomResponse, threadID, messageID);
      }
      break;
    }
  }
};

module.exports.run = function () {};