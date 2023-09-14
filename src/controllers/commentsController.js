const { db, query } = require("../database");

module.exports = {
  comments: async (req, res) => {
    try {
      const id_restaurant = req.params;
      const queryComments = `
        SELECT c.*, u.name AS user_name
        FROM comments c
        JOIN users u ON c.id_user = u.id_user
        WHERE c.id_restaurant = ${db.escape(id_restaurant)};`;

      const comments = await query(queryComments);

      res.status(200).send({ comments });
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
