const { db, query } = require("../database");
const env = process.env;

module.exports = {
  restaurants: async (req, res) => {
    try {
      let queryText = `SELECT r.id_restaurant,r.name,r.rating,r.price_range,c.name AS category_name,image_path, r.operational_hours, r.description FROM restaurants r LEFT JOIN categories c ON r.id_category=c.id_category`;

      if (req.query.category) {
        const category = req.query.category;
        queryText += ` WHERE c.name = ${db.escape(category)}`;
      }
      queryText += ` ORDER BY r.name ASC`;

      const resultData = await query(queryText);

      if (resultData.length === 0) {
        return res.status(404).send({ message: "No restaurants found" });
      }

      res.status(200).send({ resultData });
    } catch (error) {
      res.status(500).send({ error });
    }
  },
};
