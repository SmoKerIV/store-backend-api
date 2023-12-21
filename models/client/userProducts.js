const client = require("../../db");

async function getProducts(req, res) {
  const result = await client.query(`SELECT * FROM products`);
  res.send(result.rows);
}

module.exports = {
  getProducts,
};
