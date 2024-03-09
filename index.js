async function main() {
  const { Telegraf, Markup } = require("telegraf");
  const { getDetails } = require("./api");
  const { sendFile } = require("./utils");
  const express = require("express");

  const bot = new Telegraf(process.env.BOT_TOKEN);

  bot.start(async (ctx) => {
    try {
      ctx.reply(
        `Hi ${ctx.message.from.first_name},\n\nI can Download Files from Terabox.\n\nIt can take upto 10 seconds to bypass link so wait..\n\nHOW TO USE :-‎ <a href="https://te.legra.ph/INSTRUCTIONS-03-09">READ HERE</a>\n\nMade with ❤️ by @Devbots2\n\nSend any terabox link to download.`,
        Markup.inlineKeyboard([
          Markup.button.url(" Channel", "https://t.me/devbots2"),
          Markup.button.url("Report bug", "https://t.me/champaklalbot"),
        ]),
      );
    } catch (e) {
      console.error(e);
    }
  });

  bot.on("message", async (ctx) => {
    if (ctx.message && ctx.message.text) {
      const messageText = ctx.message.text;
      if (
        messageText.includes("terabox.com") ||
        messageText.includes("teraboxapp.com")
      ) {
        //const parts = messageText.split("/");
        //const linkID = parts[parts.length - 1];

        // ctx.reply(linkID)

        const details = await getDetails(messageText);
        if (details && details.direct_link) {
          try {
            ctx.reply(`Sending Files Please Wait.!!`);
            sendFile(details.direct_link, ctx);
          } catch (e) {
            console.error(e); // Log the error for debugging
          }
        } else {
          ctx.reply('Something went wrong 🙃\n\nHOW TO USE :-‎ <a href="https://te.legra.ph/INSTRUCTIONS-03-09">READ HERE</a>');
        }
        console.log(details);
      } else {
        ctx.reply("Please send a valid Terabox link. Read Here :- https://te.legra.ph/INSTRUCTIONS-03-09");
      }
    } else {
      //ctx.reply("No message text found.");
    }
  });

  const app = express();
  // Set the bot API endpoint
  app.use(await bot.createWebhook({ domain: process.env.WEBHOOK_URL }));

  app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
}

main();
