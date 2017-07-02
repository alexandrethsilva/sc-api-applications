const {send} = require("micro")
const visualize = require("micro-visualize")
const compress = require("micro-compress")
const cookies = require("micro-cookie")

const cors = require("micro-cors")({
  allowHeaders: ["Content-Type", "Authorization", "Accept"],
  origin: "http://client:3000",
})

const {isNil} = require("ramda")
const session = require("./session")

const match = require("fs-router")(__dirname + "/routes")

module.exports.default = compress(
  cors(
    visualize(async (request, response) => {
      if (request.url !== "/login") {
        session(request, response)

        const {id} = request.session

        if (isNil(id) || id !== "randomid") {
          return send(response, 401, {error: "Nope. Go away."})
        }
      }

      const matched = match(request)

      if (matched) return await matched(request, response)

      send(response, 404, {error: "Not found"})
    })
  )
)
