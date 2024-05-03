const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");

const { githubUserRouter } = require("./routes/githubuser.routes.js");
const pool = require("./db/connect.js");

const PORT = process.env.PORT || 5000;

const _dirname = path.resolve();
const app = express();
app.use(express.json());

//all routes call
app.use("/api/github", githubUserRouter);

app.listen(PORT, () => {
  console.log(`Running on PORT : ${PORT}`);
});

app.use(express.static(path.join(_dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
});
