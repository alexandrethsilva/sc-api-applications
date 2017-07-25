const {send} = require("micro")
const {session} = require("../../session")
const {MESSAGE_DEFAULT_LOGGED_IN} = require("../../constants")

module.exports.GET = (request, response) => {
  // eslint-disable-next-line fp/no-unused-expression
  session(request, response)
  // eslint-disable-next-line fp/no-mutation
  request.session.id = "<SESSION_ID>"

  return send(response, 200, MESSAGE_DEFAULT_LOGGED_IN)
}
