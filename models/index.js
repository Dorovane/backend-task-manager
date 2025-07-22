const sequelize=require('../config/db')


const userModel=require('./userModel')
const Users=userModel(sequelize)

const taskModel=require('./taskModel')
const Tasks=taskModel(sequelize)


sequelize.sync({alter:true})
  .then(()=>console.log('Tables créées avec succès'))
  .catch((error)=>console.log(error))

module.exports={Users,Tasks}

