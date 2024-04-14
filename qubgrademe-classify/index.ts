import express, { Express, Request, Response } from 'express';

import { classify } from './classify';

export const app: Express = express();

const dotenv = require('dotenv');
const cors = require("cors");
const { dateTimeFormat } = require("date-fns");

dotenv.config();
app.use(cors());
const port = 80

let classification

app.get('/', (req: Request, res: Response) => {

let m1: string = req.query.mark_1 as string
let m2: string = req.query.mark_2 as string
let m3: string = req.query.mark_3 as string
let m4: string = req.query.mark_4 as string
let m5: string = req.query.mark_5 as string

let mod1: string = req.query.module_1 as string
let mod2: string = req.query.module_2 as string
let mod3: string = req.query.module_3 as string
let mod4: string = req.query.module_4 as string
let mod5: string = req.query.module_5 as string

let modules: string[] = [mod1, mod2, mod3, mod4, mod5];
let marks: string[] = [m1, m2, m3, m4, m5];

for (var x of marks) {
  console.log(marks); 
  if(x == "" || x == null){
    let r = {
      "error":true,
      "Status": "400",
      "ErrorMessage": "values can not be null, please provide valid values",
      "marks:": marks,
      "modules": modules
      }
      res.send(r);
      return;
  }
}

classification = classify(parseInt(m1), parseInt(m2), parseInt(m3), parseInt(m4), parseInt(m5));

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

app.get("/monitor", (req: Request, res: Response) => {

  const response = {
      date: dateTimeFormat(new Date(), "yyyy-MM-dd HH:mm:ss.SSSS"),
      serverHealth: "OK",
      uptime: process.uptime(),
  };
  res.status(200).json(response);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

