const { ValidationError, where } = require("sequelize")
const { Tasks } = require("../models")

//Récuperer les taches
exports.getTasks=(req,res)=>{
  const id=req.user.userId
  const username=req.user.username
  Tasks.findAll({where:{userId:id}})
    .then((data)=>{
      if(data.length===0){
        res.status(200).json({
          message:'Aucune tâche pour le moment',
          username:username
        })
      }
      else{
        res.status(200).json({
          data:data,
          total:data.length,
          username:username
        })
      }
    })
    .catch((error)=>{
      console.error(error)
      res.status(500).json({
        message:'Erreur du serveur'
      })
    })
}


exports.addTask=(req, res) => {
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
    .then((task)=>{
      res.status(201).json({
        data:task,
        message:'Tâche créée avec succès'
      })
    })
    .catch((error)=>{
      if(error instanceof ValidationError){
        console.error(error)
        res.status(400).json({
          message:error.errors[0].message
        })
      }
      else{
        console.error(error)
        res.status(500).json({
          message:'Erreur du serveur '
        })
      }
    })
  }
}

exports.deleteTask=(req,res)=>{
  const id=req.params.id
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
          .catch((error)=>{
            console.error(error)
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
    .catch((error)=>{
      console.error(error)
      res.status(500).json({
        message:'Erreur du serveur'
      })
    })
}

exports.getTask=(req,res)=>{
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
      console.error(error)
      res.status(500).json({
        mesasage:'Erreur du serveur'
      })
    })
}

exports.updateTask=(req, res) => {
  const id = req.params.id
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
            .catch((error) => {
              console.error(error)
              if(error instanceof ValidationError){
                res.status(400).json({
                  message:error.errors[0].message
                })
              }else{
                console.error(error)
                res.status(500).json({
                  message: 'Erreur du serveur'
                })
              }
            })
        }
      }
      else {
        res.status(400).json({
          message: 'La tache n\'existe pas'
        })
      }
    })
    .catch((error) => {
      console.error(error)
      res.status(500).json({
        message: 'Erreur du serveur'
      })
    })
}

exports.checkedTask=(req,res)=>{
  const id=req.params.id
  const checked= req.body.checked
  Tasks.findByPk(id)
    .then((task)=>{
      const newTask=task
      if(task){
        Tasks.update({checked},{where:{id:id}})
          .then(()=>{
            res.status(200).json({
              message:'Maj reussis',
              data:newTask
            })
          })
          .catch((error)=>{
            console.error(error)
            res.status(500).json({
              message:'Erreur du serveur'
            })
          })
      }
      else{
        res.status(400).json({
          message:'Tache non disponible'
        })
      }
    })
    .catch((error)=>{
      console.error(error)
      res.status(500).json({
        message:'Erreur du serveur'
      })
    }) 
}