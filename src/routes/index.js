const {send} = require("micro")

module.exports.GET = async ({method, url}, res) => {
  if (method === "GET" && url === "/") send(res, 200, {healthy: true})
}
