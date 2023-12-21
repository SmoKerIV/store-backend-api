const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../../db");

async function adminLogin(req, res) {
  let { username, password } = req.body;

  try {
    const result = await client.query(
      `SELECT * FROM admins WHERE username ='${username}'`
    );

    if (result.rows.length === 0)
      res.send({ success: false, msg: "User not found" });
    else {
      let user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        var token = jwt.sign(user, "admin");
        res.send({ success: true, token, user });
      } else res.send({ success: false, msg: "Wrong password!" });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
}

async function adminRegister(req, res) {
  let { name, department, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await client.query(
      `INSERT INTO admins (name, department, username, password)
       VALUES ('${name}', '${department}', '${username}', '${hashedPassword}') RETURNING *`
    );

    res.send(result.rows);
  } catch (error) {
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
}

module.exports = {
  adminLogin,
  adminRegister,
};
