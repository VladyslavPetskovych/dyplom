const bot = require("../bot");
const webappUrl = "https://dyplomstaticfrontend.netlify.app";
const addNewUser = require("./addNewUser");



const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Запустити бота" },
    { command: "/info", description: "Як це працює?" },
    { command: "/form", description: "Заповнити свою анкету" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const initData = {
      chatId: msg.chat.id,
      userId: msg.from.id,
    };
    const url = `${webappUrl}?${new URLSearchParams(initData)}`;
    if (text === "/start") {
      const name = msg.from.first_name;
      await addNewUser(chatId, name);
      return bot.sendMessage(
        chatId,
        "Привіт, вітаю тебе мандрівнику.\nЦе бот для АНОНІМНОГО пошуку ДРУЗІВ" +
          " по інтересам. Тут ти заповнюєш детальну анкету про себе і маєш можливість знайти найбільш близьких до себе людей." +
          " \n\n/info - Більше інорфмації. \n\n/form - Розказати про себе. \n\n Відкрити Веб-додаток -->> /openWeb",
        {
          reply_markup: {
            keyboard: [[{ text: "Веб-додаток", web_app: { url: url } }]],
          },
        }
      );
    }
  });
};

start();
