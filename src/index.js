const path = require("path")
const {send} = require("micro")
const visualize = require("micro-visualize")
const compress = require("micro-compress")
const {isNil} = require("ramda")

const {MESSAGE_DEFAULT_UNAUTHORIZED} = require("./constants")
const {CLIENT_HOST, CLIENT_PROTOCOL} = process.env

const cors = require("micro-cors")({
  allowHeaders: ["Content-Type", "Authorization", "Accept"],
  origin: `${CLIENT_PROTOCOL}://${CLIENT_HOST}`,
})

const match = require("fs-router")(path.resolve(__dirname, "routes"))
const {session} = require("./session")

module.exports = visualize(
  compress(
    cors(async(request, response) => {
      const {url} = request
      // eslint-disable-next-line better/no-ifs
      if (url !== "/login" && url !== "/logout") {
        // eslint-disable-next-line fp/no-unused-expression
        session(request, response)

        const {id} = request.session

        // eslint-disable-next-line better/no-ifs
        if (isNil(id) || id !== "<SESSION_ID>") {
          return send(response, 401, MESSAGE_DEFAULT_UNAUTHORIZED)
        }
      }

      const matched = match(request)

      return matched
        ? matched(request, response)
        : send(response, 404, {error: "Not found"})
    })
  )
)
