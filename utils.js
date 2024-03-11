const sendFile = async (item, ctx) => {
  if (item) {
    try {
      await ctx.replyWithDocument(item);
    } catch (e) {
      ctx.replyWithMarkdown(
        `*POWERED BY :- @DEVBOTS2*\n\n👉 Bypass Linkes :- [Click Here](${item})\n\n👉 *Get Movies without add join movie group - @DEVMOVIES2*`,
      );
    }
  }
};

module.exports = {
  sendFile,
};
