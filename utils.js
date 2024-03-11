const sendFile = async (item, ctx) => {
  if (item) {
    try {
      await ctx.replyWithDocument(item);
    } catch (e) {
      ctx.replyWithMarkdown(
        ` ${e.message}\n\n👉 Try manually downloading from [here](${item})\n\n👉 *Get Movies without add join movie group - @DEVMOVIES2*`,
      );
    }
  }
};

module.exports = {
  sendFile,
};
