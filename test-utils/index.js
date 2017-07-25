const micro = require("micro")
const service = require("../src")

const {Cookie} = require("tough-cookie")
const {sessionConfig} = require("../src/session")

const rp = require("request-promise")
const {curry} = require("ramda")

const rpBaseOptions = {
  json: true,
  simple: false,
}

const authCookieConfig = Object.assign({}, sessionConfig, {
  key: "sc_applications_sid",
  value: "eyJpZCI6IjxTRVNTSU9OX0lEPiJ9",
  domain: "spotcap.com",
  httpOnly: true,
})

const authCookieSignatureConfig = Object.assign({}, sessionConfig, {
  key: "sc_applications_sid.sig",
  value: "UZT7Aj7fsrRLknPx7NDKD7pMC4U",
  domain: "spotcap.com",
  httpOnly: true,
})

// eslint-disable-next-line better/no-new
const authCookie = new Cookie(authCookieConfig)
// eslint-disable-next-line better/no-new
const authCookieSignature = new Cookie(authCookieSignatureConfig)

const serviceDomain = `http://${sessionConfig.domain}`

const jar = rp.jar()

// eslint-disable-next-line fp/no-unused-expression
jar.setCookie(authCookie, serviceDomain)
// eslint-disable-next-line fp/no-unused-expression
jar.setCookie(authCookieSignature, serviceDomain)

const rpAuthOptions = {jar}

module.exports.ephemeralServer = (domain, server) =>
  // eslint-disable-next-line better/no-new
  new Promise((resolve, reject) =>
    server
      .on("error", reject)
      .listen(() => resolve(`http://${domain}:${server.address().port}`))
  )

module.exports.microInstance = micro(service)

// Unauthorized Session Request
module.exports.unauthorizedSessionRequest = uri =>
  rp(Object.assign({}, rpBaseOptions, {uri}))

// Unauthorized Session Request
module.exports.authorizedSessionRequest = uri =>
  rp(Object.assign({}, rpBaseOptions, rpAuthOptions, {uri}))
