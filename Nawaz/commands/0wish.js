module.exports.config = {
    name: "wish2",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "dipto",
    description: "wish a member",
    usePrefix: true,
    commandCategory: "birthday wish",
    usages: "[tag]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
    }
};

module.exports.onLoad = async() => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/`;
    const path = resolve(__dirname, 'cache', 'wish.png');
    if (!existsSync(dirMaterial + "")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.imgur.com/jcaedO6.jpg", path);
}

async function makeImage({ one }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"]; 
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache");

    let hon_img = await jimp.read(__root + "/wish.png");
    let pathImg = __root + `/wish_${one}_.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));
    let circleOne = await jimp.read(await circle(avatarOne));
    hon_img.resize(1280,1200).composite(circleOne.resize(675, 640), 655, 4);

    let raw = await hon_img.getBufferAsync("image/png");

    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    return pathImg;
}

async function circle(image) {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}
exports.run = async function ({ event, api, Users , args, Currencies }) { 
    const fs = global.nodemodule["fs-extra"];
    const ae = [`💚 happy birthday ❤ ${name}`,`💛 happy download day ${name}💜`];
    const hc = Math.floor(Math.random() * 100) + 1;
    const rd = Math.floor(Math.random() * 10) + 1;
    const { threadID, messageID, senderID } = event;
    const ID = Object.keys(event.mentions)[0] || args[0] || event.senderID;
    var name = await Users.getNameUser(ID);

    await Currencies.increaseMoney(event.senderID, parseInt(hc*rd));i

    if (!ID) return api.sendMessage("Please tag 1 person", threadID, messageID);
    else {
        return makeImage({ one: ID }).then(path => api.sendMessage({ body: `${ae[Math.floor(Math.random() * ae.length)]}\n${name}`, mentions: [{
            tag: `${name}`,
            id: ID
        }], attachment: fs.createReadStream(path)}, threadID, () => fs.unlinkSync(path), messageID));
    }
}