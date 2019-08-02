const express = require("express");
const router = require("./router");
const fs = require("fs");

const app = express();
module.exports = app;

app.use(
  (req, res, next) => {
    console.log("Request looks like", req.url);
    next();
    // next(new Error("something went wrong"));
  },
  (req, res, next) => {
    console.log("Second Request looks like", req.url);
    next();
  },
  (err, req, res, next) => {
    console.log("error reaches this level", err);
    next(err);
  }
);

app.get(
  "/",
  (req, res, next) => {
    console.log("first");
    next();
  },
  (req, res) => {
    console.log("second");
    res.send("OK");
  }
);
app.use("/foo", router);
app.get("/yarnlock", (req, res) => {
  const str = fs.createReadStream(`${__dirname}/yarn.lock`);
  str.pipe(res);
});

app.get("*", (req, res) => {
  res.status("404").send("Not found");
});

// app.use((error, req, res, next) => {
//   console.log("Error caught", error.stack);
// res.status("500").send(error.message);
// });
