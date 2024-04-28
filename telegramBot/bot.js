const TelegramApi = require("node-telegram-bot-api");
require('dotenv').config();

const tokenT = process.env.token;

const bot = new TelegramApi("6591458290:AAFCjH-LTKg716hUKLmkVfZyBpMk1pzIhnA", { polling: true });

module.exports = bot

