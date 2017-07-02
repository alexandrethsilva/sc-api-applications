const {resolve} = require("path")
const {readFileSync} = require("fs")

const {send} = require("micro")

module.exports.GET = (req, res) => {
  const applications = readFileSync(
    resolve(__dirname, "../../schemas/applications.json"),
    "utf-8"
  )

  applications
    ? send(res, 200, applications)
    : send(res, 500, "There was a problem making the request")
}
