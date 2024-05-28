const bot = require("./bot");
const axios = require("axios");

async function fetchUsers() {
  const response = await axios.get(
    "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/all"
  );
  const users = response.data;

  const userCount = users.userss.length;
  console.log(userCount)
  return userCount;
}

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  if (text === "/usersList") {
    const users = await fetchUsers();
    return  bot.sendMessage(chatId, `У додатку вже ${users} користувачів`);
  }
});
