const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "1.3.0",
    author: "NɪʀZᴏɴ Iꜱʟᴀᴍ",
    role: 0,
    shortDescription: "Owner information with image",
    category: "Information",
    guide: {
      en: "owner"
    }
  },

  onStart: async function ({ api, event }) {
    const ownerText = 
`╭─ 👑 Oᴡɴᴇʀ Iɴғᴏ 👑 ─╮
│ 👤 Nᴀᴍᴇ       : NɪʀZᴏɴ Iꜱʟᴀᴍ
│ 🧸 Nɪᴄᴋ       : NɪʀZᴏɴ
│ 🎂 Aɢᴇ        : 22+
│ 💼 Pʀᴏғᴇssɪᴏɴ : Jᴏʙ
│ 🏡 Lᴏᴄᴀᴛɪᴏɴ : Sᴀʀɪsʜᴀʙᴀʀɪ - Pɪɴɢɴᴀ
│.......................
│ 👑 Nᴀᴍᴇ       : 𝐑𝐢𝐲𝐀 𝐈𝐬𝐥𝐚𝐦
│ 🧸 Nɪᴄᴋ       : 𝐑𝐢𝐲𝐀
│ 🎂 Aɢᴇ        : 17+
│ 💼 Pʀᴏғᴇssɪᴏɴ : 𝐄𝐝𝐢𝐭𝐢𝐧𝐠
│ 🏡 Lᴏᴄᴀᴛɪᴏɴ : Sᴀʀɪsʜᴀʙᴀʀɪ - Pɪɴɢɴᴀ
├─ 🔗 Cᴏɴᴛᴀᴄᴛ ─╮
│ 📘 Facebook  : fb.com/61561645647195 
│ 💬 Messenger: m.me/61561645647195 
│ 📞 WhatsApp  : wa.me/01329955691
╰────────────────╯`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "owner.jpg");

    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const imgLink = "https://i.imgur.com/kaDPKDG.jpeg";

    const send = () => {
      api.sendMessage(
        {
          body: ownerText,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => fs.unlinkSync(imgPath),
        event.messageID
      );
    };

    request(encodeURI(imgLink))
      .pipe(fs.createWriteStream(imgPath))
      .on("close", send);
  }
};
