const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: "dalle3",
    aliases: ["dalle","bing","create","imagine"],
    version: "1.0",
    author: "Dipto",
    countDown: 15,
    role: 0,
    shortDescription: "Generate images powerby by Dalle3",
    longDescription: "Generate images by Unofficial Dalle3",
    category: "download",
    guide: {
      en: "{pn} prompt"
    }
  },

  onStart: async function ({ api, event, args }) {
  const prompt = event.messageReply?.body.split("dalle")[1] ||  args.join(" ");
  if (!prompt) {
   return api.sendMessage("❌| Wrong Formet .✅ | Use 17/18 years old boy/girl watching football match on tv and written Dipto and 69 on the back of his Dress , 4k",event.threadID,event.messageID);
  }
    try {
      const fff = ["1qcjPsH1ZG44xSjGOZkUPO3sC2WOtj_TI58b96ZpCCVbc2IQGaPsqn8ndvUq-yhAtVvQ4dKwWngPyiFBhp2bevKrxp3yxIBU1Z7HyZhhbEinU5Sq_tvnb7hM-R26lOslibFKP67ExRswq_Q397EeKJpTVaXHxmpk7iWDolNDddjroAff-qJnEj8QQZHdzgGoQLItHiGYPoRk0cx_6hpOJVw", "1MIMK8kV5ECz3Z5ZObGoNL44eXuOSyestyhjS8Cc5M89z5U1D3dva0jQ5byV_Jc_bXshpzzflA45eEeGTHOI3eZX0kuki__KS9GuSJf6lLJWTV6ImQJAAAOG7Ft4aLmRVOv1kuXZCdxtviIdFj6CuUdjj_kOfUrG5ep17sPgK-J9a_HEx6MNu5dbbR8GXcJSKO5YnkOnYXvfeD9HS7xJv6A"]
      const col = fff[Math.floor(Math.random() * fff.length)]
      const w = await api.sendMessage("Wait koro baby < 😽", event.threadID);
  
const response = await axios.get(`${global.GoatBot.config.api}/dalle?prompt=${prompt}&key=dipto008&cookies=${col}`)
      const data = response.data.imgUrls;
      if (!data || data.length === 0) {
        api.sendMessage("Empty response or no images generated.",event.threadID,event.messageID);
      }
      const diptoo = [];
      for (let i = 0; i < data.length; i++) {
        const imgUrl = data[i];
        const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'dvassests', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        diptoo.push(fs.createReadStream(imgPath));
      }
      await api.unsendMessage(w.messageID);
      await api.sendMessage({
  body: `✅ | Here's Your Generated Photo<😘`,
        attachment: diptoo
      },event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      await api.sendMessage(`Generation failed!\nError: ${error.message}`,event.threadID, event.messageID);
    }
  }
}