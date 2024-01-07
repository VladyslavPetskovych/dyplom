const bot = require("./bot");

const qOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Твоє ставлення до linkin park", callback_data: "linkin park" }]],
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

  const apiUrl = 'http://localhost:3000/';

  // Make a GET request
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response;
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    


    const data = msg.data;
    const chatId = msg.message.chat.id;
    console.log(msg);
    return bot.sendMessage(chatId,"ти обрав " + data)

})