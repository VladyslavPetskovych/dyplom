const axios = require("axios");

const addNewUser = async (chatId, name) => {
  try {
    console.log("Creating new user !!!" + chatId);
    console.log("user name  " + name);
    const response = await axios.post("http://localhost:3000/users/", {
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
