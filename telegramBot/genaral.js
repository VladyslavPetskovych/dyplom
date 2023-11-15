const bot = require('./bot');

bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === '/start') {
        await bot.sendMessage(
            chatId,
            "Слава Ісу, вітаю тебе мандрівнику. Це бот для АНОНІМНОГО пошуку ДРУЗІВ" +
                " по інтересам. Тут ти заповнюєш детальну анкету про себе і маєш можливість знайти найбільш близьких до себе людей." +
                " Більше інорфмації /info . \n\nРозказати про себе - /form"
        );
    }
});
