module.exports.API_SCALA_ENDPOINT = "http://backend.api:8485"

module.exports.API_DEFAULT_DOMAIN = "backend.api"

module.exports.SESSION_KEY = "sc_applications_sid"
module.exports.SESSION_SECRET = "ponytails"

module.exports.MESSAGE_DEFAULT_LOGGED_IN = {message: "Your session was initiated."}
module.exports.MESSAGE_DEFAULT_LOGGED_OUT = {message: "Your session was terminated."}

module.exports.MESSAGE_DEFAULT_UNAUTHORIZED = {
  error: "Access unauthorized. There is no active session.",
}
