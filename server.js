require('dotenv').config()
const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const helmet=require('helmet')
const sequelize = require('./config/db')
const app=express()
const PORT = process.env.PORT || 3000





app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(helmet())


app.get('/',(req,res)=>{
  res.send('Bienvenu sur le serveur')
})
//route d'inscription
require('./routes/register')(app) 
//route de connexion
require('./routes/login')(app)
//route pour création de tache
require('./routes/taskRegister')(app)
//route pour la récupération des taches
require('./routes/taskDisplay')(app)
//route pour la suppression de tache
require('./routes/taskDelete')(app)
//route pour la récupération de tache par son id en bd
require('./routes/task')(app)
//maj de tache
require('./routes/taskUpdate')(app)


app.use((req,res)=>{
  res.status(404).json({
    message:'La ressource demandée n\'est pas disponible'
  })
})

app.listen(PORT,()=>console.log('SERVEUR DEMARRER'))