module.exports = {
  rules: [
    {
      filter: /\.js$/,
      regex: /(?:FIXME|TODO)/i,
      message: "Tu as du travail non terminé",
      nonBlocking: true,
    },
    {
      regex: /do no commit/i,
      message: "Tu as du travail qui ne doit pas être commité",
    },
  ],
};
