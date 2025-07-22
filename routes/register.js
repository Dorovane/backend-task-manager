const { ValidationError } = require("sequelize")
const { Users } = require("../models")
const bcrypt=require('bcrypt')

module.exports=(app)=>{
  app.post('/register',(req,res)=>{
    const {firstname,lastname,email,password}=req.body
    if(!firstname || !lastname || !email || !password){
      res.status(400).json({
        message:'Veuillez remplir tout les champs'
      })
    }else{
      Users.findOne({where:{email:email}})
        .then((existing=>{
          if(existing){
            res.status(400).json({
              message:"L'utilisateur existe deja "
            })
          }else{
            bcrypt.hash(password,10)
              .then((hash)=>{
                Users.create({
                  firstname,
                  lastname,
                  password:hash,
                  email
                })
                  .then(()=>{
                    res.status(201).json({
                      message:'Utilisateur créé avec succès'
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
                        message:'Erreur du serveur'
                      })
                    }
                  })
              })
              .catch(()=>{
                res.status(500).json({
                  message:'Erreur du serveur'
                })
              })
          }
        }))
        .catch(()=>{
          res.status(500).json({
            message:'Erreur du serveur'
          })
        })
    }
  })
}