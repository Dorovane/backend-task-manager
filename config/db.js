const { Sequelize } = require("sequelize");

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = process.env.HOST; 
const DIALECT = process.env.DIALECT;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: process.env.DB_PORT || undefined,
  dialectOptions: {
    ssl: { rejectUnauthorized: false } 
  },
  logging: false
});

sequelize.authenticate()
  .then(() => console.log("Connexion réussie à Supabase !"))
  .catch((error) => console.error(error));

module.exports = sequelize;
