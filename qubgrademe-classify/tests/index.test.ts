import {app} from '../index';
import supertest from "supertest";
import { doesNotMatch } from 'assert';
const { expect } = require("chai");
const should = require("chai").should();

const api = supertest(app.listen());

afterAll(done => {
    done();
});

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

describe("Testing real mark request", () => {
    test("Returns valid request 200", async () => {
        const { body } = await api
            .get(
                "?module_1=One&module_2=Two&module_3=Three&module_4=Four&module_5=Five&mark_1=6&mark_2=56&mark_3=52&mark_4=65&mark_5=23",
            )
            .expect(200)

        body.should.have.property("error").is.false;
        body.should.have.property("errorMessage").equals("");
        body.should.have.property("modules").has.same.members(["One", "Two", "Three", "Four", "Five"]);
        body.should.have.property("marks").has.same.members(["6", "56", "52", "65", "23"]);
        body.should.have.property("func").equals("classify");
        body.should.have.property("grade").equals("Distinction");
    
        
    });
});



    describe("Testing real mark request", () => {
        test("Returns invalid request 400", async () => {
            const { body } = await api
                .get(
                    "?module_1=One&module_2=Two&module_3=Three&module_4=Four&module_5=Five",
                )

            body.should.have.property("error").is.true;
            body.should.have.property("Status").equals("400");
            body.should.have.property("ErrorMessage").equals("values can not be null, please provide valid values");
            
        });
    });
afterAll(() => setTimeout(() => process.exit(), 1000))


