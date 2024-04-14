const app = require("../app");
const supertest = require("supertest");

const api = supertest(app.listen());

describe("Testing call test for / API", () => {
    test("Calling to check API for 200 status", () => {
    api.get("/").expect(200)
    });
});

describe("Testing call test for /monitor API", () => {
    test("Calling to check API for 200 status", () => {
    api.get("/monitor").expect(200)
    });
});

afterAll(() => setTimeout(() => process.exit(), 1000));