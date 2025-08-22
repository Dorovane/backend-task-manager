const auth = require("../middlewares/auth")
const { Tasks } = require("../models")

module.exports=(app)=>{
  app.get('/task',auth,(req,res)=>{
    const id=req.user.userId
    console.log(id)
    Tasks.findAll({where:{userId:id}})
      .then((data)=>{
        if(data.length===0){
          res.status(200).json({
            message:'Aucune tâche pour le moment'
          })
        }
        else{
          res.status(200).json({
            data:data,
            total:data.length
          })
        }
      })
      .catch((error)=>{
        console.error(error)
        res.status(500).json({
          message:'Erreur du serveur'
        })
      })
  })
}