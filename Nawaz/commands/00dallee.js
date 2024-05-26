const axios = require('axios');
const fs = require('fs-extra');
module.exports.config = {
    name: "dalle2",
    version: "1.0",
    credits: "rko",
    hasPermssion: 0,
    usePrefix: true,
    description: "Generate images by Dalle-3 AI",
    commandCategory: "download",
    usages: "[text] \nJamon [A 17/18/19 years old boy/girl watching football match on tv and written Dipto and 69 on the back of his Dress , 4k]",
    cooldowns: 5
  };

module.exports.run = async function ({ api, event, args }) {
  const prompt = event.messageReply?.body.split("dalle")[1] ||  args.join(" ");
  if (!prompt) {
   return api.sendMessage("❌| Wrong Formet .✅ | Use 17/18 years old boy/girl watching football match on tv and written Dipto and 69 on the back of his Dress , 4k",event.threadID,event.messageID);
  }
    try {
      //const cookies = "cookies here (_U value)";
const tl = ["1YxCeslN567z6zeZvxBAz1aOMyRmqphJ6DS_VhQzeCJ32NZjsf_9U4F9T4glONdNW7zF-oGToPFAu_UNt02c7tcwA1G4Vqe_QbZU18v7fz-0r4V_jrT0ZA8Jbt-4FhK14tnnx7hZGxYO7s4qkcdnV7tvkK1YXkqAgAUUp7L7XrYxITrzqZMwyajvVIej8DwuJiMYJpEB9Erz-NabiE2P-qnSyGq2I4ryDpE0lCRFDseQ"];
const cookies = tl[Math.floor(Math.random() * tl.length)];
      const w = await api.sendMessage("Wait gara baby < 😽", event.threadID);
  
const response = await axios.get(`https://noobs-api2.onrender.com/dipto/dalle?prompt=${prompt}&key=dipto008&cookies=${col}`)
      const data = response.data.imgUrls;
      if (!data || data.length === 0) {
        api.sendMessage("No images generated.",event.threadID,event.messageID);
      }
      const diptoo = [];
      for (let i = 0; i < data.length; i++) {
        const imgUrl = data[i];
        const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        const imgPath = __dirname + `/cache/${i + 1}.jpg`;
        await fs.outputFile(imgPath, imgResponse.data);
        diptoo.push(fs.createReadStream(imgPath));
      }
      await api.unsendMessage(w.messageID);
      await api.sendMessage({
  body: `✅ |Naw Baby Tumar Generated Pic<😘`,
        attachment: diptoo
      },event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      await api.sendMessage(`Generation failed!\nError: ${error.message}`,event.threadID, event.messageID);
    }
  };