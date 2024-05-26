module.exports.config = {
  name: "dalle",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Nayan",
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

    const rndm = ['1YxCeslN567z6zeZvxBAz1aOMyRmqphJ6DS_VhQzeCJ32NZjsf_9U4F9T4glONdNW7zF-oGToPFAu_UNt02c7tcwA1G4Vqe_QbZU18v7fz-0r4V_jrT0ZA8Jbt-4FhK14tnnx7hZGxYO7s4qkcdnV7tvkK1YXkqAgAUUp7L7XrYxITrzqZMwyajvVIej8DwuJiMYJpEB9Erz-NabiE2P-qnSyGq2I4ryDpE0lCRFDseQ'];  //input cooki here
    var cookie = rndm[Math.floor(Math.random() * rndm.length)];

    const res = await axios.get(`https://bing-api2-5dpl.onrender.com/bing-img?key=${key}&cookie=${cookie}&prompt=${encodeURIComponent(prompt)}`);

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
