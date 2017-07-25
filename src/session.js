const cookieSession = require("micro-cookie-session")
const {SESSION_KEY, SESSION_SECRET} = require("./constants")

const sessionConfig = {
  name: SESSION_KEY,
  domain: "spotcap.com",
  httpOnly: true,
}

const cookieSessionConfig = Object.assign({}, sessionConfig, {
  secret: SESSION_SECRET,
  overwrite: true,
})

module.exports = {
  session: cookieSession(cookieSessionConfig),
  sessionConfig,
}
