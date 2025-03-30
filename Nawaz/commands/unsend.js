const axios = require("axios"); const { handleMessage, reactUnsend } = require("./utils"); // Assuming you have a separate utils file

module.exports = async function ({ api, event }) { try { if (event.type === "message_reaction") { let messageID = event.messageID; let userID = event.userID; let reaction = event.reaction;

// Check if the reaction is the trigger for unsend
        if (reaction === "😂" || reaction === "✉") { // Change to your desired reaction
            await api.unsendMessage(messageID);
            console.log(`Unsent message ${messageID} reacted by ${userID}`);
        }
    } else if (event.body) {
        await handleMessage(api, event);
    }
} catch (error) {
    console.error("Error handling reaction-based unsend:", error);
}

};

