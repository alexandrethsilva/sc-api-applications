/* eslint-disable fp/no-unused-expression */
const test = require("ava")
const {
  unauthorizedSessionRequest,
  ephemeralServer,
  microInstance,
} = require("../../../test-utils")
const {
  API_DEFAULT_DOMAIN,
  MESSAGE_DEFAULT_LOGGED_IN,
} = require("../../../src/constants")

test("do login", async t => {
  const root = await ephemeralServer(API_DEFAULT_DOMAIN, microInstance)

  const actualResponse = await unauthorizedSessionRequest(`${root}/login`)
  const expectedResponse = MESSAGE_DEFAULT_LOGGED_IN

  return t.deepEqual(expectedResponse, actualResponse)
})
