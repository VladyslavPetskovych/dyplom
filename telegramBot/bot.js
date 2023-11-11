const TelegramApi = require("node-telegram-bot-api");

const token = "6591458290:AAHkf22o7yelGzO3nJDQu0r7mh-Gps1gxBc";

const bot = new TelegramApi(token, { polling: true });

module.exports(bot)
bot.on("message", async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if(text ==='/start'){
        await bot.sendMessage(chatId, "Слава Ісу, вітаю тебе мандрівнику. Це бот для АНОНІМНОГО пошуку ДРУЗІВ"+
        " по інтересам. Тут ти заповнюєш детальну анкету про себе і маєш можливість знайти найбільш близьких до себе людей."+
        " Більше інорфмації /info . \n\nРозказати про себе - /form")
    }
    
});
