const auth = require("../middlewares/auth")
const { Tasks } = require("../models")

module.exports=(app)=>{
  app.get('/task/:id',auth,(req,res)=>{
    const id=req.params.id
    Tasks.findByPk(id)
      .then((task)=>{
        if(task){
          res.status(201).json({
            data:task
          })
        }
        else{
          res.status(400).json({
            message:'Aucune tache ne corespond a la demande'
          })
        }
      })
      .catch((error)=>{
        res.status(500).json({
          mesasage:'Erreur du serveur'
        })
      })
  })
}