const { Sequelize } = require("sequelize");
const DB_NAME=process.env.DB_NAME
const DB_USER=process.env.DB_USER
const DB_PASSWORD=process.env.DB_PASSWORD
const HOST=process.env.HOST
const DIALECT=process.env.DIALECT

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

sequelize.authenticate()
  .then(()=>{
    console.log('Connexion reussie')
  })
  .catch((error)=>{
    console.log(error)
  })
  

module.exports=sequelize