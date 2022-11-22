const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:postgrespw@localhost:55000/shopping-cart"
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

// exports.sequelize = sequelize;
module.exports = sequelize;