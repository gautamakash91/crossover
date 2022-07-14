const searchDomain = require("../routes/index");
const responses = require("../constants/response");

describe("-- STARTING TESTS ON SEARCH DOMAIN FUNCTION --", ()=>{
  test('calling searchDomain with no params', () => {
    expect(searchDomain()).toBe(responses.invalid);
  });
  
  test('test with invalid url', () => {
    expect(searchDomain("amazon")).toBe(responses.invalid);
  });
})
