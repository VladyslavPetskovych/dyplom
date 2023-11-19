const bot = require("./bot");

const qOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "текст 1", callback_data: "data 1" },{ text: "текст 2", callback_data: "data 2" }]],
  }),
};

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
bot.on('callback_query', msg=>{
    const data = msg.data;
    const chatId = msg.message.chat.id;
    console.log(msg);
})