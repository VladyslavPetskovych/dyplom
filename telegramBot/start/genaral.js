const bot = require("../bot");

const addNewUser = require("./addNewUser");

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Запустити бота" },
    { command: "/info", description: "Як це працює?" },
    
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      const name = msg.from.first_name;
      await addNewUser(chatId, name);
      return bot.sendMessage(
        chatId,
        "Привіт, вітаю тебе мандрівнику.\nЦе бот для АНОНІМНОГО пошуку ДРУЗІВ" +
          " по інтересам. Тут ти заповнюєш детальну анкету про себе і маєш можливість знайти найбільш близьких до себе людей." +
          " \n\n/info - Більше інорфмації.  \n\n\n Відкрити Веб-додаток -->> /openWeb",
        
      );
    }
  });
};

start();