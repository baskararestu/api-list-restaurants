const { db, query } = require("../database");
const env = process.env;

module.exports = {
  restaurants: async (req, res) => {
    try {
      const getData = `select * from restaurants`;
      const resultData = await query(getData);
      res.status(200).send({ resultData });
    } catch (error) {
      res.status(500).send({ error });
    }
  },
};
