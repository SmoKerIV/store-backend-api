const client = require("../../db");

async function addOrder(req, res) {
  const { items, userID, address, date, status } = req.body;
  const result = await client.query(
    `INSERT INTO orders (items, userID, address, date, status) 
    VALUES ('${items}',${userID}, '${address}', '${date}', '${status}') RETURNING *`
  );
  res.send(result.rows);
}

module.exports = {
  addOrder,
};
