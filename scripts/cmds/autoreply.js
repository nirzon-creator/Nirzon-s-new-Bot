const fs = require("fs");
const path = require("path");
const axios = require("axios");

const DATA_FILE = path.join(__dirname, "autoreply_data.json");

// ==================== DEFAULT REPLIES ====================

const DEFAULT_REPLIES = {
  "miss you": [
    "অরেক বেডারে Miss না করে jan মেয়ে হলে বস রে হাঙ্গা করো😶👻😘"
  ],
  "miss u too": [
    "হুম আমি ও তোমাকে Miss করি... কিন্তু নির্জন বস বেশি মিস করে আমাকে😏💖"
  ],
  "kiss de": [
    "কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬"
  ],
  "hi": [
    "এত হাই-হ্যালো কর ক্যান প্রিও..!😜🫵"
  ],
  "bc": ["SAME TO YOU😊"],
  "pro": ["Khud k0o KYa LeGend SmJhTi Hai 😂"],
  "good morning": [
    "GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚"
  ],
  "good night": [
    "Sweet Dream babu… তবে আগে বস কে GN বলে নিও 😏💤"
  ],
  "tor bal": [
    "~ এখনো বাল উঠে নাই নাকি তোমার?? 🤖"
  ],
  "nirzon": [
    "উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘"
  ],
  "owner": [
    "𝐎𝐖𝐍𝐄𝐑: ☞ NirZon ☜\nFacebook: https://www.facebook.com/profile.php?id=61561645647195"
  ],
  "admin": [
    "He is NirZon Islam তাকে সবাই Admin NirZon হিসেবে চিনে😘☺️"
  ],
  "vabi": [
    "এ তো হাছিনা হে মেরে দিলকি দারকান হে মেরি জান হে😍."
  ],
  "chup": ["তুই চুপ চুপ কর পাগল ছাগল"],
  "assalamualaikum": ["Walaikumassalam✨❤️‍🩹"],
  "kiss me": [
    "তুমি পঁচা তোমাকে কিস দিবো না 🤭\nআমি শুধু বস কে দিবো 😘"
  ],
  "thanks": [
    "এতো ধন্যবাদ না দিয়ে আমার বস রে তোর গার্লফ্রেন্ড টা দিয়ে দে..!🐸"
  ],
  "i love you": [
    "মেয়ে হলে আমার বস এর ইনবক্সে এখুনি গুঁতা দিন🫢😻"
  ],
  "love you": [
    "ভালোবাসা নামক আবলামী করতে চাইলে Boss এর ইনবক্সে গুতা দিন 😘"
  ],
  "by": [
    "কিরে তুই কই যাস কোন মেয়ের সাথে চিপায় যাবি..!🌚🌶️"
  ],
  "bye": [
    "তুই যদি জাস তরে গ্রুপ থেকে লাত্থি মেরে বের করবো 😤"
  ],
  "ami nirzon": [
    "হ্যা বস কেমন আছেন..? অনেক মিস করি আপনাকে..🥺"
  ],
  "bot er baccha": [
    "আমার বাচ্চা তো তোমার গার্লফ্রেন্ডের পেটে..!!🌚⛏️"
  ],
  "tor nam ki": [
    "MY NAME IS ─꯭─⃝‌‌Ḣιиαтα💖"
  ],
  "pic de": ["এন থেকে সর দুরে গিয়া মর..😒🔪"],
  "cudi": ["এত দোচা দুচি করস কেনো..!🥱🌝🌚"],
  "heda": ["এতো রাগ শরীরের জন্য ভালো না 🥰"],
  "lol": ["ভাই তুই এত হাসিস না..!🌚🤣"],
  "kire ki koros": ["তোমার কথা ভাবতেছি জানু 😚"],
  "ki koros": [
    "বস নির্জন এর সাথে মিটিংয়ে ব্যস্ত আছি 😏💘"
  ],
  "kire bot": [
    "হ্যাঁ, বস কেমন আছেন আপনার ওই খানে উম্মাহ 😘😽🙈"
  ],
  "valo acho": [
    "হ্যাঁ রে প্রিও, বস এর দোয়ায় ভালো আছি 😌💞"
  ],
  "pagol": ["হুম পাগল, কিন্তু তোমারই পাগল 😏😂"],
  "breakup": [
    "চিন্তা করিস না… বস তো আছেই তোকে নতুন জন দিয়া দিবে 😎🔥"
  ],
  "tui ke": ["আমি তোর বস নির্জন এর ChatBot 😏"],
  "umm": ["এতো Umm কেনো জানু… কিছু বলবা? 😉"],
  "hmm": ["Hmmm কিসের হুমম জানু 🥵"],
  "lovely": ["Love করলে সরাসরি বস কে বল জানু 😻🔥"]
};

// ==================== DATA FUNCTIONS ====================

function normalize(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function writeData(data) {
  const tempFile = DATA_FILE + ".tmp";

  fs.writeFileSync(
    tempFile,
    JSON.stringify(data, null, 2),
    "utf8"
  );

  fs.renameSync(tempFile, DATA_FILE);
}

function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initialData = {
        enabled: true,
        replies: { ...DEFAULT_REPLIES }
      };

      writeData(initialData);
      return initialData;
    }

    const data = JSON.parse(
      fs.readFileSync(DATA_FILE, "utf8")
    );

    if (!data.replies || typeof data.replies !== "object") {
      data.replies = { ...DEFAULT_REPLIES };
    }

    if (typeof data.enabled !== "boolean") {
      data.enabled = true;
    }

    return data;
  } catch (error) {
    console.error("[AutoReply] Data error:", error.message);

    return {
      enabled: true,
      replies: { ...DEFAULT_REPLIES }
    };
  }
}
// ==================== ADMIN CHECK ====================

function getBotAdmins() {
  const admins = global.GoatBot?.config?.adminBot;

  if (Array.isArray(admins)) {
    return admins.map(String);
  }

  if (admins === undefined || admins === null) {
    return [];
  }

  return [String(admins)];
}

function isBotAdmin(senderID) {
  return getBotAdmins().includes(String(senderID));
}

// ==================== USAGE MENU ====================

function sendUsage(api, event, callback) {
  const usage = `╭────「 AUTO REPLY 」────╮

এই মেসেজে Reply করে লিখুন:

on
off
add trigger | reply
del trigger
list
test trigger

উদাহরণ:
add hello | Hello babu 😘
del hello

╰────────────────────╯`;

  return api.sendMessage(
    usage,
    event.threadID,
    (error, info) => {
      if (!error && info && callback) {
        callback(info);
      }
    }
  );
}
// ==================== BABY CHAT FALLBACK ====================

async function getBabyChatReply(input, event) {
  try {
    let senderName = "User";

    try {
      if (global.usersData?.getName) {
        senderName = await global.usersData.getName(
          event.senderID
        );
      }
    } catch (_) {}

    const response = await axios.get(
      "https://eryxenx.agi.bd/api/simsimi/",
      {
        params: {
          text: input,
          senderName,
          threadID: event.threadID,
          senderID: event.senderID
        },
        timeout: 20000
      }
    );

    const data = response.data;

    if (typeof data === "string") {
      return data.trim() || null;
    }

    return (
      data?.response ||
      data?.reply ||
      data?.message ||
      null
    );
  } catch (error) {
    console.error(
      "[AutoReply/BabyChat]",
      error.response?.data || error.message
    );

    return null;
  }
}
// ==================== COMMAND START ====================

module.exports.onStart = async function ({ api, event }) {
  if (!isBotAdmin(event.senderID)) {
    return api.sendMessage(
      "⛔ এই Manager শুধু Bot Admin-দের জন্য!",
      event.threadID
    );
  }

  return sendUsage(api, event, (info) => {
    if (!global.GoatBot?.onReply) return;

    global.GoatBot.onReply.set(info.messageID, {
      commandName: "autoreply",
      mode: "manager",
      messageID: info.messageID,
      author: String(event.senderID),
      threadID: String(event.threadID)
    });
  });
};

// ==================== REPLY HANDLER ====================

module.exports.onReply = async function ({
  api,
  event,
  Reply
}) {
  if (!event || !Reply || !event.body) return;

  const input = String(event.body).trim();
  if (!input) return;

  // Member replies to an AutoReply message
  if (Reply.mode === "autoreply_response") {
    if (
      String(event.threadID) !==
      String(Reply.threadID)
    ) {
      return;
    }

    const data = readData();
    const trigger = normalize(input);
    const replies = data.replies[trigger];

    if (
      data.enabled &&
      Array.isArray(replies) &&
      replies.length > 0
    ) {
      const answer =
        replies[
          Math.floor(Math.random() * replies.length)
        ];

      return api.sendMessage(
        answer,
        event.threadID,
        event.messageID
      );
    }

    const babyReply = await getBabyChatReply(
      input,
      event
    );

    if (babyReply) {
      return api.sendMessage(
        babyReply,
        event.threadID,
        event.messageID
      );
    }

    return api.sendMessage(
      "😿 Baby Chat থেকে উত্তর পাওয়া যায়নি। API check করো।",
      event.threadID,
      event.messageID
    );
  }

  // Manager commands: admin only
  if (Reply.mode !== "manager") return;

  if (
    String(event.threadID) !==
    String(Reply.threadID)
  ) {
    return;
  }

  if (
    !isBotAdmin(event.senderID) ||
    String(event.senderID) !== String(Reply.author)
  ) {
    return api.sendMessage(
      "⛔ এই Manager শুধু menu-টি খোলা Bot Admin ব্যবহার করতে পারবেন।",
      event.threadID,
      event.messageID
    );
  }

  const action = normalize(input);
  const data = readData();

  // ON
  if (action === "on") {
    data.enabled = true;
    writeData(data);

    return api.sendMessage(
      "✅ AutoReply চালু হয়েছে।",
      event.threadID,
      event.messageID
    );
  }

  // OFF
  if (action === "off") {
    data.enabled = false;
    writeData(data);

    return api.sendMessage(
      "⛔ AutoReply বন্ধ হয়েছে।",
      event.threadID,
      event.messageID
    );
  }

  // LIST
  if (action === "list") {
    const triggers = Object.keys(data.replies);

    if (!triggers.length) {
      return api.sendMessage(
        "📭 কোনো AutoReply নেই।",
        event.threadID,
        event.messageID
      );
    }

    const list = triggers
      .map((trigger, index) =>
        `${index + 1}. ${trigger}`
      )
      .join("\n");

    return api.sendMessage(
      `📋 AutoReply List:\n\n${list}`,
      event.threadID,
      event.messageID
    );
  }
// ==================== COMMAND CONFIG ====================

module.exports.config = {
  name: "autoreply",
  version: "3.1.0",
  author: "NirZon",
  role: 0,
  countDown: 2,
  category: "chat",
  shortDescription: "Group AutoReply Manager",
  longDescription: "Manage group AutoReply with Baby Chat fallback",
  guide: "{pn}"
};
  // ADD
  const addMatch = input.match(
    /^add\s+(.+?)\s*\|\s*([\s\S]+)$/i
  );

  if (addMatch) {
    const trigger = normalize(addMatch[1]);
    const reply = addMatch[2].trim();

    if (!trigger || !reply) {
      return api.sendMessage(
        "❌ Trigger এবং Reply দুটোই দিতে হবে।",
        event.threadID,
        event.messageID
      );
    }

    if (!Array.isArray(data.replies[trigger])) {
      data.replies[trigger] = [];
    }

    if (!data.replies[trigger].includes(reply)) {
      data.replies[trigger].push(reply);
    }

    writeData(data);

    return api.sendMessage(
      `✅ AutoReply Added!\n\nTrigger: ${trigger}\nReply: ${reply}`,
      event.threadID,
      event.messageID
    );
  }

  // DELETE
  const deleteMatch = input.match(
    /^(?:del|delete|remove|rm)\s+([\s\S]+)$/i
  );

  if (deleteMatch) {
    const trigger = normalize(deleteMatch[1]);

    if (!data.replies[trigger]) {
      return api.sendMessage(
        `❌ "${trigger}" Trigger পাওয়া যায়নি।`,
        event.threadID,
        event.messageID
      );
    }

    delete data.replies[trigger];
    writeData(data);

    return api.sendMessage(
      `🗑️ Deleted: ${trigger}`,
      event.threadID,
      event.messageID
    );
  }

  // TEST
  const testMatch = input.match(
    /^test\s+([\s\S]+)$/i
  );

  if (testMatch) {
    const trigger = normalize(testMatch[1]);
    const replies = data.replies[trigger];

    if (!Array.isArray(replies) || !replies.length) {
      return api.sendMessage(
        `❌ "${trigger}" Trigger পাওয়া যায়নি।`,
        event.threadID,
        event.messageID
      );
    }

    const answer =
      replies[Math.floor(Math.random() * replies.length)];

    return api.sendMessage(
      `🧪 Test Reply:\n${answer}`,
      event.threadID,
      event.messageID
    );
  }

  return api.sendMessage(
    "❌ Command বুঝিনি। Usage মেসেজে Reply করে on/off, add trigger | reply, del trigger, list অথবা test trigger লিখুন।",
    event.threadID,
    event.messageID
  );
};

// ==================== GROUP AUTOREPLY ====================

module.exports.onChat = async function ({ api, event }) {
  if (
    !event ||
    !event.isGroup ||
    !event.threadID ||
    !event.senderID
  ) {
    return;
  }

  const botID =
    typeof api.getCurrentUserID === "function"
      ? api.getCurrentUserID()
      : null;

  if (botID && String(event.senderID) === String(botID)) {
    return;
  }

  const body = String(event.body || "").trim();
  if (!body) return;

  const data = readData();
  if (!data.enabled) return;

  const trigger = normalize(body);
  const replies = data.replies[trigger];

  if (!Array.isArray(replies) || !replies.length) {
    return;
  }

  const answer =
    replies[Math.floor(Math.random() * replies.length)];

  return api.sendMessage(
    answer,
    event.threadID,
    (error, info) => {
      if (error || !info) {
        console.error("[AutoReply] Send error:", error);
        return;
      }

      if (global.GoatBot?.onReply) {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: "autoreply",
          mode: "autoreply_response",
          messageID: info.messageID,
          threadID: String(event.threadID)
        });
      }
    }
  );
};
