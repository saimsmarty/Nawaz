const axios = require('axios');
const fs = require('fs-extra');
module.exports.config = {
    name: "dalle",
    version: "1.0",
    credits: "dipto",
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
      //const cookies = "cookies here (1_Fg-TrMeL-IazLtLnlN7gRK6YP5G-vt8-eE95ObVfdvnSlRrTS0WkXQ-u9Fc4PQStGw3xXAbCU1xjcyYtPLTU1iygT9knm-EEm6o6y-UoYvmX7y2aTv9PhG1aTS2PESbzkZae6WgVzuo6nKhlrevZ8lywT2zFtXcO7yt2aLnpWZ7gdE_fSKd6kV1mAsOUlIQ5mxIA6hp0RbhFRqplWgTok8Ttbyc-B-pBALVq9kLBvk)";
const tl = ["1_Fg-TrMeL-IazLtLnlN7gRK6YP5G-vt8-eE95ObVfdvnSlRrTS0WkXQ-u9Fc4PQStGw3xXAbCU1xjcyYtPLTU1iygT9knm-EEm6o6y-UoYvmX7y2aTv9PhG1aTS2PESbzkZae6WgVzuo6nKhlrevZ8lywT2zFtXcO7yt2aLnpWZ7gdE_fSKd6kV1mAsOUlIQ5mxIA6hp0RbhFRqplWgTok8Ttbyc-B-pBALVq9kLBvk ","cookies 2"];
const cookies = tl[Math.floor(Math.random() * tl.length)];
      const w = await api.sendMessage("Wait koro baby < 😽", event.threadID);
  
const response = await axios.get(`https://noobs-api.onrender.com/dipto/dalle?prompt=${prompt}&key=dipto008&cookie=${cookies}`)
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