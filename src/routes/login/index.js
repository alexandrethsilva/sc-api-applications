const {resolve} = require("path")
const {readFileSync} = require("fs")

const {send} = require("micro")
const session = require("../../session")

module.exports.GET = (request, response) => {
  session(request, response)
  request.session.id = "randomid"
  send(response, 200, {message: "Heres ya cookie!"})
}
