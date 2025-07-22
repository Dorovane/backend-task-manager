const auth = require("../middlewares/auth")
const { Tasks } = require("../models")

module.exports=(app)=>{
  app.delete('/task/:index',auth,(req,res)=>{
    const id=req.params.index
    Tasks.findByPk(id)
      .then((task)=>{
        if(task){
          Tasks.destroy({where:{id:id}})
            .then((success)=>{
              if(success){
                res.status(200).json({
                  message:'Tache supprimer'
                })
              }
              else{
                res.status(400).json({
                  message:'Impossible de supprimer la tache'
                })
              }
            })
            .catch(()=>{
              res.status(500).json({
                message:'Erreur du serveur'
              })
            })
        }
        else{
          res.status(400).json({
            message:'La tache n\'existe pas'
          })
        }
      })
      .catch(()=>{
        res.status(500).json({
          message:'Erreur du serveur'
        })
      })
  })
}