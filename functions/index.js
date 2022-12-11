/* eslint-disable max-len */
const functions = require("firebase-functions");
const apixu = require("apixu");

const {Telegraf} = require("telegraf");


const apixuClient = new apixu.Apixu({
  apikey: "f7a45f30f0ea53252878faca58e0ab21",
});

const bot = new Telegraf("5692567752:AAGGr9GRHzAlsxAFjJoDACIr8mZTTyLT8O4");
bot.start((ctx) => ctx.reply("Welcome"));
bot.on("text", (ctx) => {
  const query = ctx.update.message.text;
  apixuClient.current(query).then((current) => {
    return ctx.reply(
        `The current weather in ${query} is C: ${current.current.temp_c} F:${current.current.temp_f}`);
  }).catch((err) => {
    return ctx.reply("This city is not exists", err);
  });
});
bot.launch();



exports.helloWorld = functions.https.onRequest((request, response) => {
  apixuClient.current("London").then((current) => {
    return response.send(current);
  }).catch((err) => {
    return response.send(err);
  });
});
