const client = require("../../db");

async function viewProducts(req, res) {
    let { search, limit } = req.query;
    let query = "SELECT * FROM products";
    if (search) {
      query += " WHERE name ILIKE $1";
      search = `%${search}%`;
    }
    if (limit) {
      query += " LIMIT $2";
    }
    const result = await client.query(
      query,
      limit ? [search, limit] : [search]
    );
    if (result.rows.length === 0) {
      res.status(404).send("No products found.");
    } else {
      res.send(result.rows);
    }
}
async function addProduct(req, res) {
  const { name, price, discount, image, active } = req.body;
  const result = await client.query(
    `INSERT INTO products (name, price, discount, image,active) VALUES ('${name}', ${price}, ${discount}, '${image}', ${active}) RETURNING *`
  );
  res.send(result.rows);
}
async function updateProduct(req, res) {
  const { name, price, discount, image, active } = req.body;
  const { id } = req.params;
  const result = await client.query(
    `UPDATE products SET name = '${name}', price = ${price}, discount = ${discount}, image = '${image}', active = ${active} WHERE id = ${id} RETURNING *`
  );
  res.send(result.rows);
}
async function deleteProduct(req, res) {
  const { id } = req.params;
  client.query(`DELETE FROM products WHERE id = ${id}`);
  res.send("success");
}
module.exports = {
  viewProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
