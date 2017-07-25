const {send} = require("micro")

// eslint-disable-next-line fp/no-nil
module.exports.GET = async({method, url}, res) => {
  // eslint-disable-next-line better/no-ifs
  if (method === "GET" && url === "/") {
    return send(res, 200, {healthy: true})
  }
}
