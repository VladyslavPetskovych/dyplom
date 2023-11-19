const bot = require("./bot");


const start = () => {
    bot.setMyCommands([
        { command: "/start", description: "Запустити бота" },
        { command: "/info", description: "Як це працює?" },
        { command: "/form", description: "Заповнити свою анкету"}
      ]);
      
      bot.on("message", async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === "/start") {
          return bot.sendMessage(
            chatId,
            "Привіт, вітаю тебе мандрівнику. Це бот для АНОНІМНОГО пошуку ДРУЗІВ" +
              " по інтересам. Тут ти заповнюєш детальну анкету про себе і маєш можливість знайти найбільш близьких до себе людей." +
              " Більше інорфмації /info . \n\nРозказати про себе - /form"
          );
        }
        if (text === "/info") {
            return bot.sendMessage(
            chatId,
            "Як це працює?\n" +
              " - Ви даєте короткі відповіді на запитання ✍️ і бот формує вашу анонімну анкету" +
              "\n - потім він шукає максимально схожих до Вас людей і дає Вам можливість поспілкуватися"
          );
        }
      });
};

start();