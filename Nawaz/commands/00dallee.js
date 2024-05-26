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
const tl = ["1MPG0WJUEa40k7YGsfQrA7EcBB1RkzKqO6XSTTMgpkPTH3zuXXV6jqciplKAcDxUr8xKvRtMh2xPm_PsT03sc8jWqb-lZV0hlP_4AxxWzZT5vXWL1R0Z4dHerGOrNT7I1v03N89pHYTA1xjUirTopaLcX25HjuEg9eovlW52HTx93tPOdcGRPRoGJqsz-3RnDCUGQ9wFYUg6GMc_hljg3lg","1wbiMIQjO9BOerw6Nuz0dnJxKt3LIE1Hr2Uatk_okCb9IotK3dwmJMCLjJWXmL1ZwJbBhUCwDg_G106efKF9SOf3YfWkY5UuPWvThbfVjtv6JdDER8kHz_2N_CgZKGnacrtOQqFB6gkiSEX5hblEqYTbUHXdAJvDZzzp4r2VqGoJpbE1_NyEZWTCjxhN4ggigbnqEVthDE1BFoueF7_YlKw"];
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