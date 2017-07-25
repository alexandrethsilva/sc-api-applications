/* eslint-disable fp/no-unused-expression */
const test = require("ava")
const {
  API_DEFAULT_DOMAIN,
  MESSAGE_DEFAULT_UNAUTHORIZED,
} = require("../../../src/constants")
const {head, prop} = require("ramda")

const {
  authorizedSessionRequest,
  unauthorizedSessionRequest,
  ephemeralServer,
  microInstance,
} = require("../../../test-utils")

const {resolve} = require("path")
const {readFileSync} = require("fs")

const applicationsFixture = readFileSync(
  resolve(__dirname, "../../../src/schemas/applications.json"),
  "utf-8"
)

const applicationFixture = head(JSON.parse(applicationsFixture))
const applicationFixtureId = prop("application_id", applicationFixture)

test("unauthorized", async t => {
  const root = await ephemeralServer(API_DEFAULT_DOMAIN, microInstance)

  const actualResponse = await unauthorizedSessionRequest(
    `${root}/applications/${applicationFixtureId}`
  )
  const expectedResponse = MESSAGE_DEFAULT_UNAUTHORIZED

  return t.deepEqual(expectedResponse, actualResponse)
})

test("authorized", async t => {
  const root = await ephemeralServer(API_DEFAULT_DOMAIN, microInstance)

  const actualResponse = await authorizedSessionRequest(
    `${root}/applications/${applicationFixtureId}`
  )

  return t.deepEqual(applicationFixture, actualResponse)
})
