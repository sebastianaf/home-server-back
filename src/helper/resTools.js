import fs from 'fs'
import path from 'path'
import mysql from "mysql"

import { db } from "../config/db";

require('dotenv').config()

//Solo ejecutar depués de conectar
const execQuery = (SQLquery) => {
  return new Promise((resolve, reyect) => {
    try {
      const connection = mysql.createPool(db);
      connection.query(SQLquery, (error, data, fields) => {
        resolve({ error, data, fields });
        connection.end();
      });
    } catch (error) {
      reyect(error);
    }
  });
};

const writeLogLine = (line, title = false) => {
  try {
    const logPath = path.join(__dirname, "./../../logs/RestAPI.log");
    let newFile = false;
    fs.stat(logPath, (err) => {
      if (err) {
        newFile = true;
        fs.open(logPath, "w", (err, file) => {});
      }
    });
    let stream = fs.createWriteStream(logPath, { flags: "a" });
    if (title) {
      newFile ? console.log(logTitleMessage("RestAPI.log created")) : null;
      stream.write(`${logTitleMessage(line)}\n`);
      console.log(logTitleMessage(line));
    } else {
      newFile ? console.log(logTitleMessage("RestAPI.log created")) : null;
      stream.write(`${line}\n`);
      console.log(line);
    }
    stream.end();
  } catch (error) {
    console.log(error);
    stream.end();
  }
};

const verifyReq = async (route,req, res, callback) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      if (token===process.env.APP_TOKEN) {
        await callback(token);
      } else {
        res.send({error:"BAD_TOKEN"});
      }
    } else {
      res.send({error:"NO_TOKEN"});
    }
  } catch (error) {
    writeLogLine(`${route} ${error}`);
    res.send({ error: "REQUEST_ERROR" });
  }
};

const extractData = (queryData) => {
  try {
    let fields = [];
    queryData.fields
      ? queryData.fields[0].forEach((item) =>
          fields.push({ name: item.name, length: item.length })
        )
      : (fields = null);
    let data = [];
    queryData.data ? (data = queryData.data[0]) : (data = null);
    let out = queryData.error
      ? { error: "Query error", fields: null, data: null }
      : { error: null, fields, data };
    return out;
  } catch (error) {
    return { error: "Query error" };
  }
};

export { execQuery, extractData, verifyReq };
