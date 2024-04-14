"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
// import dotenv from 'dotenv';
const classify_1 = require("./classify");
exports.app = (0, express_1.default)();
const dotenv = require('dotenv');
const cors = require("cors");
const { format } = require("date-fns");
dotenv.config();
exports.app.use(cors());
// const port = 80
const port = process.env.PORT;
let classification;
exports.app.get('/', (req, res) => {
    let m1 = req.query.mark_1;
    let m2 = req.query.mark_2;
    let m3 = req.query.mark_3;
    let m4 = req.query.mark_4;
    let m5 = req.query.mark_5;
    let mod1 = req.query.module_1;
    let mod2 = req.query.module_2;
    let mod3 = req.query.module_3;
    let mod4 = req.query.module_4;
    let mod5 = req.query.module_5;
    let modules = [mod1, mod2, mod3, mod4, mod5];
    let marks = [m1, m2, m3, m4, m5];
    for (var x of marks) {
        console.log(marks);
        if (x == "" || x == null) {
            let r = {
                "Status": "400",
                "ErrorMessage": "values can not be null, please provide valid values",
                "marks:": marks,
                "modules": modules
            };
            res.send(r);
            return;
        }
    }
    classification = (0, classify_1.classify)(parseInt(m1), parseInt(m2), parseInt(m3), parseInt(m4), parseInt(m5));
    console.log(classification);
    let response = {
        error: false,
        errorMessage: "",
        modules: modules,
        marks: marks,
        func: "classify",
        grade: classification,
    };
    res.send(response);
});
exports.app.get("/monitor", (req, res) => {
    const response = {
        date: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSSS"),
        serverHealth: "OK",
        uptime: process.uptime(),
    };
    res.status(200).json(response);
});
exports.app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
