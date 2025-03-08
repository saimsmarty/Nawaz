const axios = require("axios");
const fs = require("fs");
const request = require("request");

const link = [
"https://i.imgur.com/BY0fcTI.jpeg", 
"https://i.imgur.com/xwkyfyR.jpeg", 
"https://i.imgur.com/mRlASSB.jpeg", 
"https://i.imgur.com/27KGV27.jpeg", 
"https://i.imgur.com/os8wWpI.jpeg", 
"https://i.imgur.com/sRo5H53.jpeg", 
"https://i.imgur.com/l95LsOs.jpeg",
"https://i.imgur.com/FhuAMW4.jpeg", 
"https://i.imgur.com/JjIUL10.jpeg", 
"https://i.imgur.com/QiDwoSB.jpeg", 
"https://i.imgur.com/izf4Gsf.jpeg",
"https://i.imgur.com/tm8L0Js.jpeg", 
"https://i.imgur.com/juOJrkY.jpeg", 
"https://i.imgur.com/Ht3eRO0.jpeg", 
"https://i.imgur.com/D0RtsGi.jpeg", 
"https://i.imgur.com/PL0YF8A.jpeg", 
"https://i.imgur.com/JZclmNf.jpeg", 
"https://i.imgur.com/DVdWaeA.jpeg", 
"https://i.imgur.com/fcWTQ6K.jpeg", 
"https://i.imgur.com/FwHPqAK.jpeg", 
"https://i.imgur.com/VcQthVj.jpeg", 
"https://i.imgur.com/i4Mrvrp.jpeg", 
"https://i.imgur.com/j202sET.jpeg", 
"https://i.imgur.com/RlG7CoV.jpeg", 
"https://i.imgur.com/l4nezk7.jpeg", 
"https://i.imgur.com/cSSbdGI.jpeg", 
"https://i.imgur.com/CyrsfMW.jpeg", 
"https://i.imgur.com/adQjxvZ.jpeg", 
"https://i.imgur.com/bXC4kC1.jpeg", 
"https://i.imgur.com/cizcHRz.jpeg", 
"https://i.imgur.com/CZa2yUc.jpeg", 
"https://i.imgur.com/tNdYgZs.jpeg", 
"https://i.imgur.com/eTit5tO.jpeg", 
"https://i.imgur.com/TakQHpS.jpeg", 
"https://i.imgur.com/u7J6l5F.jpeg", 
"https://i.imgur.com/xQ9JoDH.jpeg", 
"https://i.imgur.com/CEcW8NC.jpeg", 
"https://i.imgur.com/HklipfJ.jpeg", 
"https://i.imgur.com/XO0Rxj7.jpeg", 
"https://i.imgur.com/1xc2lQQ.jpeg", 
"https://i.imgur.com/G0pJGm8.jpeg", 
"https://i.imgur.com/o08SZAN.jpeg", 
"https://i.imgur.com/3RjVCuQ.jpeg", 
"https://i.imgur.com/A0hy4Ex.jpeg", 
"https://i.imgur.com/X79fLPs.jpeg", 
"https://i.imgur.com/W0Gop7g.jpeg", 
"https://i.imgur.com/ZsrdX7b.jpeg", 
"https://i.imgur.com/BLqUSdz.jpeg", 
"https://i.imgur.com/aoUGRxc.jpeg", 
"https://i.imgur.com/SfkSYW6.jpeg",
];

module.exports.config = {
  name: "nawazdp",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "NAWAZ AHMAD",
  description: "auto reply to nawazdp",
  commandCategory: "noprefix",
  usages: "NAWAZDP",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("nawazdp")==0 || 
      event.body.indexOf("Nawazdp")==0 ||
      event.body.indexOf("nawaz dp")==0 ||
      event.body.indexOf("Nawaz dp")==0 || 
      event.body.indexOf("NAWAZDP")==0 || 
      event.body.indexOf("NAWAZ DP")==0) {
    const rahad = [
      ""

    ];
    const rahad2 = rahad[Math.floor(Math.random() * rahad.length)];

    const callback = () => api.sendMessage({
      body: `${rahad2}`,
      attachment: fs.createReadStream(__dirname + "/cache/2024.jpg")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/2024.jpg"), event.messageID);

    const requestStream = request(encodeURI(link[Math.floor(Math.random() * link.length)]));
    requestStream.pipe(fs.createWriteStream(__dirname + "/cache/2024.jpg")).on("close", () => callback());
    return requestStream;
  }
};

module.exports.languages = {
  "vi": {
    "on": "Dùng sai cách rồi lêu lêu",
    "off": "sv ngu, đã bão dùng sai cách",
    "successText": `🧠`,
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "success!",
  }
};

module.exports.run = async ({ api, event, Threads, getText }) => {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["nawazdp"] === "undefined" || data["nawazdp"]) data["nawazdp"] = false;
  else data["nawazdp"] = true;
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  api.sendMessage(`${(data["hotvidos"]) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
};