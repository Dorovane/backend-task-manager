const { ValidationError } = require("sequelize")
const { Tasks } = require("../models")
const auth = require("../middlewares/auth")

module.exports = (app) => {
  app.post('/task',auth, (req, res) => {
    const { title, description, deadline, priority } = req.body
    const id=req.user.userId
    if (!title || !priority) {
      res.status(400).json({
        message: 'Veuillez verifier le titre ou la priorité'
      })
    }
    else {
      Tasks.create({
        title,
        description,
        userId:id,
        deadline,
        priority
      })
      .then(()=>{
        res.status(201).json({
          message:'Tâche créée avec succès'
        })
      })
      .catch((error)=>{
        if(error instanceof ValidationError){
          res.status(400).json({
            message:error.errors[0].message
          })
        }
        else{
          res.status(500).json({
            message:'Erreur du serveur '
          })
        }
      })
    }
  })
}