const coindown = 50;

module.exports.config = {
  name: "pairv9",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "MR CHAND | Fixed by Nawaz Boss",
  description: "pair family",
  commandCategory: "love",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "jimp": ""
  }
};

module.exports.onLoad = async () => {
  const { existsSync, mkdirSync, writeFileSync } = require("fs-extra");
  const path = require("path");
  const axios = require("axios");

  const dir = path.join(__dirname, "cache", "canvas");
  const imgPath = path.join(dir, "araa.jpg");

  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  if (!existsSync(imgPath)) {
    try {
      const res = await axios.get("https://i.imgur.com/D35mTwa.jpg", { responseType: "arraybuffer" });
      writeFileSync(imgPath, Buffer.from(res.data, "utf-8"));
      console.log("araa.jpg downloaded successfully.");
    } catch (e) {
      console.log("Failed to download araa.jpg:", e);
    }
  }
};

async function circle(image) {
  const jimp = require("jimp");
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}

async function makeImage({ one, two, three }) {
  const fs = require("fs-extra");
  const path = require("path");
  const axios = require("axios");
  const jimp = require("jimp");

  const __root = path.resolve(__dirname, "cache", "canvas");
  const bgPath = path.join(__root, "araa.jpg");
  const output = path.join(__root, `araa_${one}_${two}_${three}.png`);

  const avt1Path = path.join(__root, `avt_${one}.png`);
  const avt2Path = path.join(__root, `avt_${two}.png`);
  const avt3Path = path.join(__root, `avt_${three}.png`);

  const avtURL = id => `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

  fs.writeFileSync(avt1Path, (await axios.get(avtURL(one), { responseType: "arraybuffer" })).data);
  fs.writeFileSync(avt2Path, (await axios.get(avtURL(two), { responseType: "arraybuffer" })).data);
  fs.writeFileSync(avt3Path, (await axios.get(avtURL(three), { responseType: "arraybuffer" })).data);

  const bg = await jimp.read(bgPath);
  const avatar1 = await jimp.read(await circle(avt1Path));
  const avatar2 = await jimp.read(await circle(avt2Path));
  const avatar3 = await jimp.read(await circle(avt3Path));

  bg.composite(avatar1.resize(65, 65), 135, 260)
    .composite(avatar2.resize(65, 65), 230, 210)
    .composite(avatar3.resize(60, 60), 193, 370);

  const buffer = await bg.getBufferAsync("image/png");
  fs.writeFileSync(output, buffer);

  fs.unlinkSync(avt1Path);
  fs.unlinkSync(avt2Path);
  fs.unlinkSync(avt3Path);

  return output;
}

module.exports.run = async function ({ api, event, args, Users, Threads, Currencies }) {
  const fs = require("fs-extra");
  const axios = require("axios");
  const { threadID, messageID, senderID } = event;

  let balance = (await Currencies.getData(senderID)).money;
  if (balance < coindown) {
    return api.sendMessage(`❤️ NEED 50 COINS BUT YOU HAVE ${balance || 0} COINS. PLEASE EARN FIRST ❤️`, threadID, messageID);
  }

  await Currencies.decreaseMoney(senderID, coindown);

  let threadInfo = await api.getThreadInfo(threadID);
  let members = threadInfo.participantIDs;
  members = members.filter(id => id != senderID);

  let r1 = members[Math.floor(Math.random() * members.length)];
  let r2 = members[Math.floor(Math.random() * members.length)];

  let nameSender = (await Users.getData(senderID)).name;
  let name1 = (await Users.getData(r1)).name;
  let name2 = (await Users.getData(r2)).name;

  let arraytag = [
    { id: senderID, tag: nameSender },
    { id: r1, tag: name1 },
    { id: r2, tag: name2 }
  ];

  let imgPath = await makeImage({ one: senderID, two: r1, three: r2 });

  return api.sendMessage({
    body: `💖 ${nameSender} + ${name1} + ${name2} 💖\n- ${coindown} coins used!`,
    mentions: arraytag,
    attachment: fs.createReadStream(imgPath)
  }, threadID, () => fs.unlinkSync(imgPath), messageID);
};