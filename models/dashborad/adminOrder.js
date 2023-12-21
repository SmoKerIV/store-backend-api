const client = require("../../db");

async function viewOrders(req, res) {
  const result = await client.query(`SELECT * FROM orders`);
  res.send(result.rows);
}
async function addOrder(req, res) {
  const { items, userID, address, date, status } = req.body;
  const result = await client.query(
    "INSERT INTO orders (items, userID, address, date, status) VALUES($1, $2, $3, $4, $5) RETURNING *",
    [items, userID, address, date, status]
  );
  res.send(result.rows);
}
async function changeStatus(req, res) {
  const { status } = req.body;
  const { id } = req.params;
  const result = await client.query(
    `UPDATE orders SET status = ${status} WHERE id = ${id} RETURNING *`
  );
  res.send(result.rows);
}
module.exports = {
  viewOrders,
  addOrder,
  changeStatus,
};
