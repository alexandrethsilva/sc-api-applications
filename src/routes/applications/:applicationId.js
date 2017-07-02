const {resolve} = require("path")
const {readFileSync} = require("fs")

const {compose, find, propEq} = require("ramda")

const {send} = require("micro")

const getApplicationById = id =>
  compose(find(propEq("application_id", id)), JSON.parse)

module.exports.GET = (request, response) => {
  const applications = readFileSync(
    resolve(__dirname, "../../schemas/applications.json"),
    "utf-8"
  )

  applications
    ? send(
        response,
        200,
        getApplicationById(request.params.applicationId)(applications)
      )
    : send(response, 500, "There was a problem making the request")
}
