const { db, query } = require("../database");

module.exports = {
  categories: async (req, res) => {
    try {
      const getCategories = "SELECT * FROM categories";

      const rows = await query(getCategories);

      res.status(200).json(rows);
    } catch (error) {
      console.error("Error retrieving categories:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
