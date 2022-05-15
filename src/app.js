import express from "express";
import cors from "cors";

import { corsOptions } from "./config/corsOptions";

require("dotenv").config();

const c = console.log;
var app = express();

/***
 * Middlewares
 */
app.use(cors(corsOptions));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/***
 * Routes
 */

//Energy
import { postEnergy } from "./routes/Energy";
app.post("/energy", cors(corsOptions), postEnergy);

//Water
import { postWater } from "./routes/Water";
app.post("/water", cors(corsOptions), postWater);

app.listen(process.env.APP_SERVER_PORT, () => {
  console.log(`Running on port ${process.env.APP_SERVER_PORT}`);
});
