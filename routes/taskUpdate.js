const auth = require("../middlewares/auth")
const { Tasks } = require("../models")

module.exports = (app) => {
  app.put('/task/:index', auth, (req, res) => {
    const id = req.params.index
    const idUser=req.user.userId
    Tasks.findByPk(id)
      .then((task) => {
        if (task) {
          const { title, description, deadline, priority , status } = req.body
          if (!title || !priority) {
            res.status(400).json({
              message: 'Veuillez verifier le titre ou la priorité'
            })
          }
          else{
            Tasks.update({
              title,
              description,
              userId:idUser,
              deadline,
              priority,
              status
            },{ where: { id: id } })
              .then((success) => {
                if (success) {
                  res.status(200).json({
                    message: 'Tache Maj'
                  })
                }
                else {
                  res.status(400).json({
                    message: 'Impossible de maj la tache'
                  })
                }
              })
              .catch(() => {
                res.status(500).json({
                  message: 'Erreur du serveur'
                })
              })
          }
        }
        else {
          res.status(400).json({
            message: 'La tache n\'existe pas'
          })
        }
      })
      .catch(() => {
        res.status(500).json({
          message: 'Erreur du serveur'
        })
      })
  })
}