module.exports = {
  config: {
    name: "test",
    version: "1.0.0",
    author: "NirZon",
    role: 0,
    shortDescription: "Test command",
    category: "utility"
  },

  onStart: async function ({ api, event }) {
    api.sendMessage("Hello! 💗", event.threadID);
  }
};
