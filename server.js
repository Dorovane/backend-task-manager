require('dotenv').config()
const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const helmet=require('helmet')
const app=express()
const PORT = process.env.PORT || 3000

//Importations des routes 
const taskRoutes=require('./routes/tasks')
const userRoutes=require('./routes/users')



//Middlewares globales

app.use(cors({origin:'https://todosphere.netlify.app/' }))
app.use(morgan('dev'))
app.use(express.json())
app.use(helmet())
//Middlewares pour utiliser les routes
app.use('/task',taskRoutes)
app.use('/user',userRoutes)

app.get('/',(req,res)=>{
  res.send('Bienvenu sur le serveur')
})
//Endpoint d'authentification
require('./routes/login')(app)


//Middlewares pour les status 404
app.use((req,res)=>{
  res.status(404).json({
    message:'La ressource demandée n\'est pas disponible'
  })
})

app.listen(PORT,()=>console.log('SERVEUR DEMARRER'))