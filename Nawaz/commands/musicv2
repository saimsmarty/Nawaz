const fs = require('fs');
const ytdl = require('@distube/ytdl-core');
const { resolve } = require('path');
const moment = require("moment-timezone");
  var gio = moment.tz("Asia/KOLKATA").format("HH:mm:ss");
async function downloadMusicFromYoutube(link, path) {
  var timestart = Date.now();
  if(!link) return 'Thiếu link'
  var resolveFunc = function () { };
  var rejectFunc = function () { };
  var returnPromise = new Promise(function (resolve, reject) {
    resolveFunc = resolve;
    rejectFunc = reject;
  });
    ytdl(link, {
            filter: format =>
                format.quality == 'tiny' && format.audioBitrate == 128 && format.hasAudio == true
        }).pipe(fs.createWriteStream(path))
        .on("close", async () => {
            var datac = await ytdl.getInfo(link)
            var result = {
                title: datac.videoDetails.title,
                dur: Number(datac.videoDetails.lengthSeconds),
                viewCount: datac.videoDetails.viewCount,
                likes: datac.videoDetails.likes,
                uploadDate: datac.videoDetails.uploadDate,
                sub: datac.videoDetails.author.subscriber_count,
                author: datac.videoDetails.author.name,
                timestart: timestart
            }
            resolveFunc(result)
        })
  return returnPromise
}
module.exports.config = {
  name: "musicv2",
  version: "2.0.4",
  hasPermssion: 0,
  credits: "Grey fixed by jonell",
  description: "Play music",
  prefix: true,
  usePrefix: true,
  commandCategory: "utility",
  usages: "sing [your music title]",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "request": "",
    "axios": "",
    "@distube/ytdl-core": "",
    "yt-search": ""
  }
};

module.exports.run = async ({ api, event }) => {
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/KOLKATA").format("HH:mm:ss");
  const axios = require("axios");
  const fs = require("fs-extra");
  const ytdl = require("@distube/ytdl-core");
  const request = require("request");
  const yts = require("yt-search");
  
  const input = event.body;
  const text = input.substring(12);
  const data = input.split(" ");

  if (data.length < 2) {
    return api.sendMessage("Please put a song", event.threadID);
  }

  data.shift();
  const song = data.join(" ");

  try {
    api.sendMessage(`🔍 | Searching for "${song}". Please wait...`, event.threadID);

    const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${encodeURIComponent(song)}&key=AIzaSyBPdGN3eMhswfSKWoaomzdlEftf3NjV1gM`);

    const searchResults = await yts(song);
    if (!searchResults.videos.length) {
      return api.sendMessage("Error: Invalid request.", event.threadID, event.messageID);
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;

    const stream = ytdl(videoUrl, { filter: "audioonly" });

    const fileName = `${event.senderID}.mp3`;
    const filePath = __dirname + `/cache/${fileName}`;

    stream.pipe(fs.createWriteStream(filePath));

    stream.on('response', () => {
      console.info('[DOWNLOADER]', 'Starting download now!');
    });

    stream.on('info', (info) => {
      console.info('[DOWNLOADER]', `Downloading ${info.videoDetails.title} by ${info.videoDetails.author.name}`);
    });

    stream.on('end', () => {
      console.info('[DOWNLOADER] Downloaded');

      if (fs.statSync(filePath).size > 36214400) {
        fs.unlinkSync(filePath);
        return api.sendMessage('⚠ | ERROR The file could not be sent because it is larger than 35MB.', event.threadID);
      }

      const message = {
        body: `🎵 | Here's your music, enjoy!🥰\n\nTitle: ${song}\n======= [ ${time} ] =======`,
        attachment: fs.createReadStream(filePath)
      };

      api.sendMessage(message, event.threadID, () => {
        fs.unlinkSync(filePath);
      });
    });
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
};