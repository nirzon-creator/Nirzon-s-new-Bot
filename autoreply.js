const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "autoreply_data.json");

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
  "owner": ["‎[𝐎𝐖𝐍𝐄𝐑:☞ NirZon ☜\nFacebook: https://www.facebook.com/profile.php?id=61561645647195"],
  "admin": ["He is NirZon Islam তাকে সবাই Admin NirZon হিসেবে চিনে😘☺️"],
  "vabi": ["এ তো হাছিনা হে মেরে দিলকি দারকান হে মেরি জান হে😍."],
  "chup": ["তুই চুপ চুপ কর পাগল ছাগল"],
  "assalamualaikum": ["Walaikumassalam✨❤️‍🩹"],
  "kiss me": ["তুমি পঁচা তোমাকে কিস দিবো না 🤭 \nআমি শুধু বস কে দিবো 😘"],
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

const normalize = text => String(text || "").trim().toLowerCase();

function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify({ enabled: true, replies: DEFAULT_REPLIES }, null, 2),
      "utf8"
    );
  }

  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

    if (!data.replies || typeof data.replies !== "object") {
      data.replies = {};
    }

    if (typeof data.enabled !== "boolean") {
      data.enabled = true;
    }

    return data;
  } catch (error) {
    console.error("[autoreply] Data file error:", error.message);
    return { enabled: true, replies: DEFAULT_REPLIES };
  }
}

function writeData(data) {
  const temp = `${DATA_FILE}.tmp`;

  fs.writeFileSync(temp, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(temp, DATA_FILE);
}

module.exports.config = {
  name: "autoreply",
  version: "1.0.0",
  author: "NirZon",
  role: 2,
  countTime: 0,
  category: "chat",
  shortDescription: "Group-only custom auto replies",
  longDescription: "Custom keyword replies without external API",
  guide:
    "{pn} on | off | add [trigger] | [reply] | remove [trigger] | list | test [trigger]"
};

module.exports.onStart = async function ({ api, event, args }) {
  const action = normalize(args[0]);
  const rest = args.slice(1).join(" ").trim();
  const data = readData();

  if (action === "on" || action === "off") {
    data.enabled = action === "on";
    writeData(data);

    return api.sendMessage(
      `✅ Group auto-reply is ${data.enabled ? "ON" : "OFF"}.`,
      event.threadID,
      event.messageID
    );
  }

  if (action === "add") {
    const divider = rest.indexOf("|");

    if (divider < 0) {
      return api.sendMessage(
        "ব্যবহার: /autoreply add hi | Hello jaan! 💗",
        event.threadID,
        event.messageID
      );
    }

    const trigger = normalize(rest.slice(0, divider));
    const reply = rest.slice(divider + 1).trim();

    if (!trigger || !reply) {
      return api.sendMessage(
        "❌ Trigger ও reply দুটোই দিতে হবে।",
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
      `✅ Reply saved!\nTrigger: ${trigger}\nReply: ${reply}`,
      event.threadID,
      event.messageID
    );
  }

  if (action === "remove" || action === "rm") {
    const trigger = normalize(rest);

    if (!trigger) {
      return api.sendMessage(
        "ব্যবহার: /autoreply remove hi",
        event.threadID,
        event.messageID
      );
    }

    if (!data.replies[trigger]) {
      return api.sendMessage(
        "❌ এই trigger পাওয়া যায়নি।",
        event.threadID,
        event.messageID
      );
    }

    delete data.replies[trigger];
    writeData(data);

    return api.sendMessage(
      `🗑️ Removed: ${trigger}`,
      event.threadID,
      event.messageID
    );
  }

  if (action === "list") {
    const entries = Object.entries(data.replies);

    if (!entries.length) {
      return api.sendMessage(
        "📭 কোনো custom reply নেই।",
        event.threadID,
        event.messageID
      );
    }

    const lines = entries.slice(0, 40).map(
      ([key, value]) =>
        `• ${key} (${Array.isArray(value) ? value.length : 1})`
    );

    const more =
      entries.length > 40
        ? `\n…আর ${entries.length - 40}টি trigger আছে।`
        : "";

    return api.sendMessage(
      `📋 Triggers (${entries.length}):\n${lines.join("\n")}${more}`,
      event.threadID,
      event.messageID
    );
  }

  if (action === "test") {
    const trigger = normalize(rest);
    const replies = data.replies[trigger];

    if (!Array.isArray(replies) || !replies.length) {
      return api.sendMessage(
        "❌ এই trigger-এর reply নেই।",
        event.threadID,
        event.messageID
      );
    }

    const reply = replies[Math.floor(Math.random() * replies.length)];

    return api.sendMessage(reply, event.threadID, event.messageID);
  }

  return api.sendMessage(
    "🤖 Auto Reply:\n" +
      "/autoreply on\n" +
      "/autoreply off\n" +
      "/autoreply add hi | Hello jaan! 💗\n" +
      "/autoreply remove hi\n" +
      "/autoreply list\n" +
      "/autoreply test hi",
    event.threadID,
    event.messageID
  );
};

module.exports.onChat = async function ({ api, event }) {
  if (!event || !event.isGroup || !event.threadID || !event.senderID) {
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

  if (!body || body.startsWith("/")) {
    return;
  }

  const data = readData();

  if (!data.enabled) {
    return;
  }

  const replies = data.replies[normalize(body)];

  if (!Array.isArray(replies) || replies.length === 0) {
    return;
  }

  const reply = replies[Math.floor(Math.random() * replies.length)];

  return api.sendMessage(reply, event.threadID, event.messageID);
};
