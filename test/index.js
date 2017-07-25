/* eslint-disable fp/no-unused-expression */
const test = require("ava")
const listen = require("test-listen")
const {microInstance, unauthorizedSessionRequest} = require("../test-utils")
const {MESSAGE_DEFAULT_UNAUTHORIZED} = require("../src/constants")

test("Entry Endpoint", async t => {
  const root = await listen(microInstance)

  const actualResponse = await unauthorizedSessionRequest(`${root}`)
  const expectedResponse = MESSAGE_DEFAULT_UNAUTHORIZED

  return t.deepEqual(expectedResponse, actualResponse)
})
