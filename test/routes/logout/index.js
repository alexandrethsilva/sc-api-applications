/* eslint-disable fp/no-unused-expression */
const test = require("ava")
const {
  unauthorizedSessionRequest,
  ephemeralServer,
  microInstance,
} = require("../../../test-utils")
const {
  API_DEFAULT_DOMAIN,
  MESSAGE_DEFAULT_LOGGED_OUT,
} = require("../../../src/constants")

test("do logout", async t => {
  const root = await ephemeralServer(API_DEFAULT_DOMAIN, microInstance)

  const actualResponse = await unauthorizedSessionRequest(`${root}/logout`)
  const expectedResponse = MESSAGE_DEFAULT_LOGGED_OUT

  return t.deepEqual(expectedResponse, actualResponse)
})
