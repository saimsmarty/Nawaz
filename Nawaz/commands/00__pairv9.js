const coindown = 50;
const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const jimp = require("jimp");

module.exports.config = {
    name: "pairv9",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "N9W9Z H9CK3R",
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
    const dir = path.join(__dirname, 'cache/canvas');
    const filePath = path.join(dir, 'araa.jpg');

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    if (!fs.existsSync(filePath)) {
        const response = await axios.get("https://imgur.com/D35mTwa.jpg", { responseType: "arraybuffer" });
        fs.writeFileSync(filePath, response.data);
    }
};

async function circle(image) {
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}

async function makeImage({ one, two, three }) {
    const __root = path.join(__dirname, "cache/canvas");

    const pairing_img = await jimp.read(__root + "/araa.jpg");

    const avatarOne = path.join(__root, `avt_${one}.png`);
    const avatarTwo = path.join(__root, `avt_${two}.png`);
    const avatarThree = path.join(__root, `avt_${three}.png`);

    const getAvatar = async (id, filePath) => {
        const response = await axios.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' });
        fs.writeFileSync(filePath, Buffer.from(response.data, 'utf-8'));
    };

    await getAvatar(one, avatarOne);
    await getAvatar(two, avatarTwo);
    await getAvatar(three, avatarThree);

    const circleOne = await jimp.read(await circle(avatarOne));
    const circleTwo = await jimp.read(await circle(avatarTwo));
    const circleThree = await jimp.read(await circle(avatarThree));

    pairing_img
        .composite(circleOne.resize(65, 65), 135, 260)
        .composite(circleTwo.resize(65, 65), 230, 210)
        .composite(circleThree.resize(60, 60), 193, 370);

    const finalPath = path.join(__root, `final_${Date.now()}.png`);
    const raw = await pairing_img.getBufferAsync("image/png");
    fs.writeFileSync(finalPath, raw);

    [avatarOne, avatarTwo, avatarThree].forEach(file => fs.unlinkSync(file));
    return finalPath;
}

module.exports.run = async function ({ api, event, args, Users, Threads, Currencies }) {
    const { threadID, messageID, senderID } = event;
    const userData = await Currencies.getData(senderID);
    let balance = userData.money || 0;

    if (balance < coindown) {
        return api.sendMessage(`❤️ NEED ✅${coindown} COINS BUT YOU HAVE ✅${balance} COIN. PLEASE EARN COINS AND THEN USE THIS COMMAND ❤️`, threadID, messageID);
    }

    await Currencies.decreaseMoney(senderID, coindown);

    let info = await api.getUserInfo(senderID);
    let nameSender = info[senderID].name;
    let arraytag = [{ id: senderID, tag: nameSender }];

    let threadInfo = await api.getThreadInfo(threadID);
    let memberIDs = threadInfo.participantIDs;
    memberIDs = memberIDs.filter(id => id !== senderID);

    let one = senderID;
    let two = memberIDs[Math.floor(Math.random() * memberIDs.length)];
    let three = memberIDs[Math.floor(Math.random() * memberIDs.length)];

    let name1 = (await Users.getData(two)).name;
    let name2 = (await Users.getData(three)).name;

    let imgPath = await makeImage({ one, two, three });

    return api.sendMessage({
        body: `${nameSender} ✅ ${name1} ✅ ${name2}\n-${coindown} ❤️`,
        mentions: arraytag,
        attachment: fs.createReadStream(imgPath)
    }, threadID, () => fs.unlinkSync(imgPath), messageID);
};