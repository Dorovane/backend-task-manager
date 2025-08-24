const sequelize=require('../config/db')


const userModel=require('./userModel')
const Users=userModel(sequelize)

const taskModel=require('./taskModel')
const Tasks=taskModel(sequelize)

Users.hasMany(Tasks, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
})

Tasks.belongsTo(Users, {
  foreignKey: 'userId'
})

sequelize.sync()
.then(()=>console.log('Tables créées avec succès'))
.catch((error)=>console.error(error))

module.exports={Users,Tasks}

