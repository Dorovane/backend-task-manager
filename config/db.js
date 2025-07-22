const { Sequelize } = require("sequelize");

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