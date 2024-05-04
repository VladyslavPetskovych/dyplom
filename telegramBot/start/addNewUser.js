const axios = require("axios");

const addNewUser = async (chatId, name) => {
  try {
    console.log("Creating new user !!!" + chatId);
    console.log("user name  " + name);
    //"https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/"
    const response = await axios.post("https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/", {
      chatId,
      name,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding new user:", error);
    throw error;
  }
};

module.exports = addNewUser;
