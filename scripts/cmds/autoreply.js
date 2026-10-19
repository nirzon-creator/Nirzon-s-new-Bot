"use strict";

const fs = require("fs");
const path = require("path");
const axios = require("axios");

const API = axios.create({
  baseURL: "https://eryxenx.agi.bd/api/simsimi",
  timeout: 20000
});

const DATA_DIR = path.join(__dirname, "autoreply");
const DATA_FILE = path.join(DATA_DIR, "data.json");

const DEFAULT_REPLIES = {
  "miss you": ["অরেক বেডারে Miss না করে jan মেয়ে হলে বস রে হাঙ্গা করো😶👻😘"],
  "miss u too": ["হুম আমি ও তোমাকে Miss করি... কিন্তু নির্জন বস বেশি মিস করে আমাকে😏💖"],
  "kiss de": ["কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬"],
  "hi": ["এত হাই-হ্যালো কর ক্যান প্রিও..!😜🫵"],
  "bc": ["SAME TO YOU😊"],
  "pro": ["Khud k0o KYa LeGend SmJhTi Hai 😂"],
  "good morning": ["GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚"],
  "good night": ["Sweet Dream babu… তবে আগে বস কে GN বলে নিও 😏💤"],
  "tor bal": ["~ এখনো বাল উঠে নাই নাকি তোমার?? 🤖"],
  "nirzon": ["উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘"],
  "owner": ["𝐎𝐖𝐍𝐄𝐑: ☞ NirZon ☜\nFacebook: https://www.facebook.com/profile.php?id=61561645647195"],
  "admin": ["He is NirZon Islam তাকে সবাই Admin NirZon হিসেবে চিনে😘☺️"],
  "vabi": ["এ তো হাছিনা হে মেরে দিলকি দারকান হে মেরি জান হে😍."],
  "chup": ["তুই চুপ চুপ কর পাগল ছাগল"],
  "assalamualaikum": ["Walaikumassalam✨❤️‍🩹"],
  "kiss me": ["তুমি পঁচা তোমাকে কিস দিবো না 🤭\nআমি শুধু বস কে দিবো 😘"],
  "thanks": ["এতো ধন্যবাদ না দিয়ে আমার বস রে তোর গার্লফ্রেন্ড টা দিয়ে দে..!🐸"],
  "i love you": ["মেয়ে হলে আমার বস এর ইনবক্সে এখুনি গুঁতা দিন🫢😻"],
  "love you": ["ভালোবাসা নামক আবলামী করতে চাইলে Boss এর ইনবক্সে গুতা দিন 😘"],
  "by": ["কিরে তুই কই যাস কোন মেয়ের সাথে চিপায় যাবি..!🌚🌶️"],
  "bye": ["তুই যদি জাস তরে গ্রুপ থেকে লাত্থি মেরে বের করবো 😤"],
  "ami nirzon": ["হ্যা বস কেমন আছেন..? অনেক মিস করি আপনাকে..🥺"],
  "bot er baccha": ["আমার বাচ্চা তো তোমার গার্লফ্রেন্ডের পেটে..!!🌚⛏️"],
  "tor nam ki": ["MY NAME IS ─꯭─⃝‌‌Ḣιиαтα💖"],
  "pic de": ["এন থেকে সর দুরে গিয়া মর..😒🔪"],
  "cudi": ["এত দোচা দুচি করস কেনো..!🥱🌝🌚"],
  "heda": ["এতো রাগ শরীরের জন্য ভালো না 🥰"],
  "lol": ["ভাই তুই এত হাসিস না..!🌚🤣"],
  "kire ki koros": ["তোমার কথা ভাবতেছি জানু 😚"],
  "ki koros": ["বস নির্জন এর সাথে মিটিংয়ে ব্যস্ত আছি 😏💘"],
  "kire bot": ["হ্যাঁ, বস কেমন আছেন আপনার ওই খানে উম্মাহ 😘😽🙈"],
  "valo acho": ["হ্যাঁ রে প্রিও, বস এর দোয়ায় ভালো আছি 😌💞"],
  "pagol": ["হুম পাগল, কিন্তু তোমারই পাগল 😏😂"],
  "breakup": ["চিন্তা করিস না… বস তো আছেই তোকে নতুন জন দিয়া দিবে 😎🔥"],
  "tui ke": ["আমি তোর বস নির্জন এর ChatBot 😏"],
  "umm": ["এতো Umm কেনো জানু… কিছু বলবা? 😉"],
  "hmm": ["Hmmm কিসের হুমম জানু 🥵"],
  "lovely": ["Love করলে সরাসরি বস কে বল জানু 😻🔥"]
};

function normalize(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(
        {
          enabled: true,
          replies: { ...DEFAULT_REPLIES }
        },
        null,
        2
      ),
      "utf8"
    );
  }
}

function readData() {
  ensureDataFile();

  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const data = JSON.parse(raw || "{}");

    return {
      enabled: data.enabled !== false,
      replies: {
        ...DEFAULT_REPLIES,
        ...(data.replies || {})
      }
    };
  } catch (error) {
    return {
      enabled: true,
      replies: { ...DEFAULT_REPLIES }
    };
  }
}

function writeData(data) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

function isBotAdmin(senderID) {
  const config = global.GoatBot?.config || {};
  const admins = config.adminBot || config.admins || [];

  const adminList = Array.isArray(admins) ? admins : [admins];

  return adminList.some(id => String(id) === String(senderID));
}

function chooseReply(value) {
  if (Array.isArray(value)) {
    if (!value.length) return "";
    return value[Math.floor(Math.random() * value.length)];
  }

  return String(value || "");
}

function setReply(api, messageID, data) {
  if (!messageID) return;

  if (!global.GoatBot) global.GoatBot = {};
  if (!global.GoatBot.onReply) global.GoatBot.onReply = new Map();

  global.GoatBot.onReply.set(String(messageID), {
    commandName: "autoreply",
    ...data
  });
}

function sendUsage(api, event, message = "") {
  const usage =
    (message ? message + "\n\n" : "") +
    "╭───『 AUTO REPLY MENU 』───╮\n" +
    "│ on — AutoReply চালু\n" +
    "│ off — AutoReply বন্ধ\n" +
    "│ add trigger | reply — নতুন trigger\n" +
    "│ del trigger — trigger মুছতে\n" +
    "│ list — সব trigger দেখতে\n" +
    "│ test trigger — reply test করতে\n" +
    "╰──────────────────────╯\n\n" +
    "যেকোনো একটি command লিখে এই মেসেজে Reply দাও।";

  api.sendMessage(usage, event.threadID, (err, info) => {
    if (err || !info?.messageID) return;

    setReply(api, info.messageID, {
      mode: "manager",
      author: String(event.senderID),
      threadID: String(event.threadID)
    });
  });
}

async function getBabyReply(api, event, query) {
  try {
    let senderName = "Friend";

    try {
      if (global.usersData?.getName) {
        senderName = await global.usersData.getName(event.senderID);
      } else if (api.getUserInfo) {
        const info = await api.getUserInfo(event.senderID);
        senderName = info?.[event.senderID]?.name || senderName;
      }
    } catch (_) {}

    const res = await API.get("/", {
      params: {
        text: query,
        senderName,
        threadID: event.threadID,
        senderID: event.senderID
      }
    });

    const data = res.data || {};

    if (data.rateLimited || !data.response) return null;

    return String(data.response);
  } catch (error) {
    console.error("[AutoReply Baby API]", error.message);
    return null;
  }
}

module.exports.config = {
  name: "autoreply",
  version: "3.2.0",
  author: "NirZon",
  countDown: 1,
  role: 0,
  description: "Group AutoReply with Baby API fallback",
  category: "system",
  guide: "Reply to the menu message to manage AutoReply."
};

module.exports.onStart = async function ({ api, event, args }) {
  if (!isBotAdmin(event.senderID)) {
    return api.sendMessage(
      "⛔ এই মেনু শুধু Bot Admin ব্যবহার করতে পারবে।",
      event.threadID
    );
  }

  sendUsage(api, event);
};

module.exports.onReply = async function ({ api, event, Reply }) {
  if (!Reply || !event.body) return;

  const senderID = String(event.senderID);
  const threadID = String(event.threadID);
  const body = event.body.trim();

  // Baby API fallback: AutoReply message-এ reply দিলে
  // কোনো exact trigger না মিললে Baby API উত্তর দেবে।
  if (Reply.mode === "autoreply_response") {
    if (threadID !== String(Reply.threadID)) return;

    const data = readData();
    if (!data.enabled) return;

    const input = body;
    if (!input) return;

    const trigger = normalize(input);
    if (Object.prototype.hasOwnProperty.call(data.replies, trigger)) {
      const answer = chooseReply(data.replies[trigger]);
      if (answer) return api.sendMessage(answer, threadID);
    }

    const babyAnswer = await getBabyReply(api, event, input);
    if (babyAnswer) {
      return api.sendMessage(babyAnswer, threadID);
    }

    return;
  }

  // Manager menu handling
  if (Reply.mode !== "manager") return;

  if (!isBotAdmin(senderID)) {
    return api.sendMessage(
      "⛔ এই command শুধু Bot Admin ব্যবহার করতে পারবে।",
      threadID
    );
  }

  if (senderID !== String(Reply.author)) {
    return api.sendMessage(
      "⚠️ মেনু যিনি খুলেছেন, শুধু তিনিই এটি ব্যবহার করতে পারবেন।",
      threadID
    );
  }

  if (threadID !== String(Reply.threadID)) return;

  const parts = body.split(/\s+/);
  const action = normalize(parts.shift());

  const data = readData();

  if (action === "on") {
    data.enabled = true;
    writeData(data);
    return sendUsage(api, event, "✅ AutoReply চালু করা হয়েছে।");
  }

  if (action === "off") {
    data.enabled = false;
    writeData(data);
    return sendUsage(api, event, "⛔ AutoReply বন্ধ করা হয়েছে।");
  }

  if (action === "list") {
    const keys = Object.keys(data.replies);

    if (!keys.length) {
      return sendUsage(api, event, "📭 কোনো trigger নেই।");
    }

    const list = keys
      .map((key, index) => `${index + 1}. ${key}`)
      .join("\n");

    return sendUsage(api, event, `📋 Trigger List:\n${list}`);
  }

  if (action === "add") {
    const match = body.match(/^add\s+([^|]+)\|([\s\S]+)$/i);

    if (!match) {
      return sendUsage(
        api,
        event,
        "❌ Format ভুল!\nadd trigger | reply\n\nউদাহরণ:\nadd hello | Hello jaan 😘"
      );
    }

    const trigger = normalize(match[1]);
    const reply = match[2].trim();

    if (!trigger || !reply) {
      return sendUsage(api, event, "❌ Trigger ও reply দুটোই দিতে হবে।");
    }

    data.replies[trigger] = [reply];
    writeData(data);

    return sendUsage(api, event, `✅ Trigger যোগ হয়েছে:\n${trigger} → ${reply}`);
  }

  if (action === "del" || action === "delete" || action === "remove") {
    const trigger = normalize(parts.join(" "));

    if (!trigger) {
      return sendUsage(api, event, "❌ Format: del trigger");
    }

    if (!Object.prototype.hasOwnProperty.call(data.replies, trigger)) {
      return sendUsage(api, event, `❌ "${trigger}" trigger পাওয়া যায়নি।`);
    }

    delete data.replies[trigger];
    writeData(data);

    return sendUsage(api, event, `🗑️ "${trigger}" trigger মুছে ফেলা হয়েছে।`);
  }

  if (action === "test") {
    const trigger = normalize(parts.join(" "));

    if (!trigger) {
      return sendUsage(api, event, "❌ Format: test trigger");
    }

    if (!Object.prototype.hasOwnProperty.call(data.replies, trigger)) {
      return sendUsage(api, event, `❌ "${trigger}" trigger পাওয়া যায়নি।`);
    }

    const answer = chooseReply(data.replies[trigger]);

    return sendUsage(
      api,
      event,
      `🧪 Test:\nTrigger: ${trigger}\nReply: ${answer}`
    );
  }

  return sendUsage(
    api,
    event,
    "❓ Command বুঝতে পারিনি। Menu থেকে সঠিক format ব্যবহার করো।"
  );
};

module.exports.onChat = async function ({ api, event }) {
  if (!event || !event.body || !event.threadID || !event.senderID) return;

  // Group chat only
  if (event.threadID === event.senderID) return;

  const data = readData();
  if (!data.enabled) return;

  const trigger = normalize(event.body);

  if (!Object.prototype.hasOwnProperty.call(data.replies, trigger)) return;

  const answer = chooseReply(data.replies[trigger]);
  if (!answer) return;

  api.sendMessage(answer, event.threadID, (err, info) => {
    if (err || !info?.messageID) return;

    setReply(api, info.messageID, {
      mode: "autoreply_response",
      threadID: String(event.threadID)
    });
  });
};
