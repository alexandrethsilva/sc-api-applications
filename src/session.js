module.exports = require("micro-cookie-session")({
  name: "_session",
  secret: "ponytails",
  cookie: {
    httpOnly: true,
  },
})
