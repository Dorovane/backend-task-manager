const { Sequelize } = require("sequelize");
const DB_NAME=process.env.DB_NAME
const DB_USER=process.env.DB_USER
const DB_PASSWORD=process.env.DB_PASSWORD
const HOST=process.env.HOST
const DIALECT=process.env.DIALECT
const NODE_ENV=process.env.NODE_ENV

if(NODE_ENV==='dev'){
  const sequelize=new Sequelize(
    DB_NAME,DB_USER,DB_PASSWORD,{
      host:HOST,
      dialect:DIALECT
    }
  )

  
  sequelize.authenticate()
  .then(()=>{
    console.log('Connexion reussie')
  })
  .catch((error)=>{
    console.log(error)
  })


  module.exports=sequelize
}else{
  const sequelize=new Sequelize()
  
  sequelize.authenticate()
  .then(()=>{
    console.log('Connexion reussie')
  })
  .catch((error)=>{
    console.log(error)
  })

  module.exports=sequelize
}

