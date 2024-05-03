const express = require("express");
const {
  userDetails,
  displayGetDetails,
} = require("../controllers/githubuser.controller.js");
const githubUserRouter = express.Router();

githubUserRouter.get("/getUserDetails/:username", userDetails);
githubUserRouter.get("/displayGet/:username", displayGetDetails);
// githubUserRouter.get("/getRepoDetails/:username", repoDetails);

module.exports = { githubUserRouter };
