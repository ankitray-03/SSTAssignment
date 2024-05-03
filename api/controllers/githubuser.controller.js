const axios = require("axios");
const pool = require("../db/connect.js");

const userDetails = async (req, res) => {
  const { username } = req.params;
  try {
    // check if user already present
    const connection = await pool.getConnection();
    const [existingUsers] = await connection.query(
      "SELECT * FROM users WHERE github_username = ?",
      [username]
    );
    if (existingUsers.length > 0) {
      res.json({ message: "User already exists in the database" });
      // console.log("User Present");
      return;
    }

    // otherwise fetch

    //user data storing
    const githubRes = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const userDesc = githubRes.data;

    //repos details
    const repoRes = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const repoDesc = repoRes.data;

    //store in mysql server
    const insertConnection = await pool.getConnection();

    // user details
    await insertConnection.query(
      "INSERT INTO users (github_username, bio, avatar_url,link) VALUES (?, ?, ?, ?)",
      [userDesc.login, userDesc.bio, userDesc.avatar_url, userDesc.html_url]
    );

    insertConnection.release();

    for (const repo of repoDesc) {
      await pool.query(
        "INSERT INTO repos (github_username,repo_name, repo_description, repo_url) VALUES (?,?, ?, ?)",
        [repo.owner.login, repo.name, repo.description, repo.html_url]
      );
    }

    res.status(200).json("Storing of data to database successfull");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error getting user details");
  }
};

const displayGetDetails = async (req, res) => {
  try {
    const { username } = req.params;

    // SQL query to find details of user
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE github_username = ?",
      [username]
    );

    // fetching repos
    const page = req.query.page || 1;
    const perPage = 10;
    const offset = page - 1;
    const query = "SELECT * FROM repos WHERE github_username = ? LIMIT ?,?";
    const [rows2] = await pool.query(query, [username, offset, perPage]);

    // console.log(rows2);

    res.json({ userDetails: rows[0], repos: rows2 });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { userDetails, displayGetDetails };
