const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.PG_CONNECTION_URI);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

// exports.sequelize = sequelize;
module.exports = sequelize;
