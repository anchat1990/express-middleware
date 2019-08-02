const app = require("./app");
const express = require("express");
const outer = express(); // new express app

const port = process.env.PORT || "3000";

outer.use((req, res, next) => {
  console.log("request looks like", req);
  next();
});

outer.use(app);
//catch uncaught errors
outer.use((e, req, res, next) => {
  console.log("more error");
  res.write("NOT OK");
  res.end();

  // same as res.send("NOT OK")
});
outer.listen(port, error => {
  if (error) console.log("ERROR", error);
});
