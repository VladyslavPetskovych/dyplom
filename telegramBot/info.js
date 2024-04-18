const bot = require("./bot");

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  if (text === "/info") {
    return bot.sendMessage(
      chatId,
      "Як це працює?\n" +
        " - Ви даєте короткі відповіді на запитання ✍️ і бот формує вашу анонімну анкету" +
        "\n - потім він шукає максимально схожих до Вас людей і дає Вам можливість поспілкуватися"
    );
  }
});
