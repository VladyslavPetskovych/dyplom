const bot = require("./bot");

const webappUrl = "https://dyplomstaticfrontend.netlify.app";

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === "/openWeb") {
    // await bot.sendMessage(chatId, "Відкрити веб програму", {
    //   reply_markup: {
    //     keyboard: [[{ text: "Відкрити додаток", web_app: { url: webappUrl } }]],
    //   },
    // });
    await bot.sendMessage(chatId, "Відкрити веб програму", {
      reply_markup: {
        inline_keyboard: [[{ text: "Відкрити додаток", web_app: { url: webappUrl } }]],
      },
    });
  }
});
