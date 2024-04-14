const app = require("../index");
const supertest = require("supertest");


const api = supertest(app);

afterAll(done => {
    done();
});

describe("Testing call test for / API", () => {
    test("Calling to check API for 200 status", async () => {
    await api.get("/").expect(200);
    });
});

describe("Testing call test for /api", () => {
    test("Calling to check API for 200 status", async () => {
    await api.get("/api").expect(200);
    });
});


