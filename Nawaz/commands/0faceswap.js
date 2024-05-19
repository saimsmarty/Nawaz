const axios = require('axios');
const tinyurl = require('tinyurl').shorten;
const fs = require('fs-extra');

   module.exports = {
    config: {
      name: "faceswap",
      credits: "RUBISH",
      version: "2.0",
      cooldowns: 5,
      hasPermission: 0,
      description: "𝗦𝘄𝗮𝗽 𝗳𝗮𝗰𝗲𝘀 𝗶𝗻 𝗶𝗺𝗮𝗴𝗲𝘀"
      },
      commandCategory: "𝗜𝗠𝗔𝗚𝗘",
      usages: "<reply with 2 images>"
    },


  run: async function({ event, api }) {
    try {

      const setReactionInProgress = () => {
        api.setMessageReaction("⏳", event.messageID, (err) => {
          if (err) console.error(err);
        }, true);
      };


      const setReactionSuccess = () => {
        api.setMessageReaction("✅", event.messageID, (err) => {
          if (err) console.error(err);
        }, true);
      };

      if (event.type != "message_reply") {
        return api.sendMessage("⚠ | 𝗣𝗹𝗲𝗮𝘀𝗲 𝗿𝗲𝗽𝗹𝘆 𝘁𝗼 𝗮 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 𝘄𝗶𝘁𝗵 𝘁𝘄𝗼 𝗶𝗺𝗮𝗴𝗲𝘀 𝗮𝘁𝘁𝗮𝗰𝗵𝗲𝗱.", event.threadID, event.messageID);
      }

      let links = [];
      for (let attachment of event.messageReply.attachments) {
        links.push(attachment.url);
      }

      if (links.length < 2) {

        setReactionSuccess(); 
        return api.sendMessage("⚠ | 𝗣𝗹𝗲𝗮𝘀𝗲 𝗲𝗻𝘀𝘂𝗿𝗲 𝘁𝗵𝗲𝗿𝗲 𝗮𝗿𝗲 𝗲𝘅𝗮𝗰𝘁𝗹𝘆 𝘁𝘄𝗼 𝗶𝗺𝗮𝗴𝗲𝘀 𝗮𝘁𝘁𝗮𝗰𝗵𝗲𝗱.", event.threadID, event.messageID);
      }

      setReactionInProgress();

      const maskimgurl = await tinyurl(encodeURIComponent(links[0]));

      const targetimgurl = await tinyurl(encodeURIComponent(links[1]));

      const transformingMessage = await api.sendMessage("⏳ | 𝙵𝚊𝚌𝚎 𝚜𝚠𝚊𝚙𝚙𝚒𝚗𝚐, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝", event.threadID, event.messageID);
      
      const { data } = await axios.get(`https://noobs-api.onrender.com/dipto/faceswap?targetUrl=${targetimgurl}&faceUrl=${maskimgurl}`);
      const filePath = __dirname + "/cache/swap.jpg";
      const imgRes = await axios.get(data.data, { responseType: 'arraybuffer' });    
      fs.writeFileSync(filePath, Buffer.from(imgRes.data, 'binary'));
      const transformedImageStream = fs.createReadStream(filePath);

      await api.unsendMessage(transformingMessage.messageID);

      await api.sendMessage({ body: "✅ | 𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢 𝚜𝚠𝚊𝚙𝚙𝚎𝚍 𝚏𝚊𝚌𝚎", attachment: transformedImageStream },event.threadID, () => fs.unlinkSync(filePath), event.messageID);

      setReactionSuccess(); 

    } catch (error) {
      console.error(error);
      api.sendMessage("❎ | 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚝𝚑𝚎 𝚏𝚊𝚌𝚎 𝚜𝚠𝚊𝚙.", event.threadID, event.messageID);
    }
};
