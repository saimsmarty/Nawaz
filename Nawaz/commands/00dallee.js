module.exports.config = {
  name: "dalle2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RKO BRO",
  description: "",
  commandCategory: "Image",
  usages: "dalle cat",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const prompt = args.join(" ");
    const key = this.config.credits;
    if (!prompt) return api.sendMessage('use : /bing cat', event.threadID, event.messageID); 

    const rndm = ['1rYfuivaMv34Kq0h-Ds6PZd_45kNfDBmsAc_En0GinOEiIkbw1lzhvl53z-e5BTLA043F-aDGTPJWYuZiI_tZd59ksWfTTFZpiWOK0QFzDf5TL-cuGhYNApGnMbymjPEiV3whAKnzARzZNPdgRLrN8YfxSJOhmfY36U3FtLhwOtt-G2li_5CeTkNJoS5fvOX_sUtI30ICDmea2CpqyoeR1WSTBU-X2wauftLx7AqJ4eE'];  //input cooki here
    var cookie = rndm[Math.floor(Math.random() * rndm.length)];

    const res = await axios.get(`https://bing-api-5dpl.onrender.com/bing-img?key=${key}&cookie=${cookie}&prompt=${encodeURIComponent(prompt)}`);

    console.log(res.data);
    const data = res.data.result;
    const numberSearch = data.length;
    var num = 0;
    var imgData = [];
    for (var i = 0; i < parseInt(numberSearch); i++) {
        let path = __dirname + `/cache/${num += 1}.jpg`;
        let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
        fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
        imgData.push(fs.createReadStream(__dirname + `/cache/${num}.jpg`));
    }

    await api.sendMessage({
        attachment: imgData,
        body: "🥀Dalle Search Result💝\n\nPrompt: " + prompt + "\n\n#🌹Number of Images💓: " + numberSearch
    }, event.threadID, event.messageID); 

    for (let ii = 1; ii < parseInt(numberSearch); ii++) {
        fs.unlinkSync(__dirname + `/cache/${ii}.jpg`);
    }
};