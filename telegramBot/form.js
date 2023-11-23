const bot = require("./bot");

const qOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "дати відповідь", callback_data: "startq" }]],
  }),
};
const chats = {}

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  if (text === "/form") {
    return bot.sendMessage(
      chatId,
      "Дай відповіді які зможуть описати твоє ставлення до різних тем",
      qOptions
    );
  }
});
bot.on('callback_query', async msg=>{
    const data = msg.data;
    const chatId = msg.message.chat.id;
    console.log(msg);
    return bot.sendMessage(chatId,"ти обрав" + data)

})