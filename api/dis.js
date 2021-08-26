const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// app.use(inejctRequest);

// app.use("/", router);

module.exports = app;
