const bot = require("./bot");

const webappUrl = "https://www.google.com";

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === "/openWeb") {
    await bot.sendMessage(chatId, "Відкрити веб програму", {
      reply_markup: {
        keyboard: [
          [{ text: "Відкрити додаток", web_app: { url: webappUrl } }],
        ],
      },
    });
  }
});
