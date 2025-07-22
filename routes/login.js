const { Users } = require("../models")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const SECRET_KEY=process.env.SECRET_KEY

module.exports=(app)=>{
  app.post('/login',(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
      res.status(400).json({
        message:'Veuillez remplir tous les champs svp'
      })
    }
    else{
      Users.findOne({where:{email:email}})
        .then((user)=>{
          if(user){
            bcrypt.compare(password,user.password)
              .then((success)=>{
                if(success){
                  const token=jwt.sign(
                    {userId:user.id},
                    SECRET_KEY,
                    {expiresIn:'1d'}
                  )
                  res.status(200).json({
                    token:token
                  })
                }
                else{
                  res.status(400).json({
                    message:'Mot de passe incorrect'
                  })
                }
              })
              .catch((error)=>{
                res.status(500).json({
                  message:'Erreur du serveur'
                })
              })
          }else{
            res.status(400).json({
              message:'Aucun utilisateur ne conrespond à cet email'
            })
          }
        })
        .catch((error)=>{
          res.status(500).json({
            message:'Erreur du serveur'
          })
        })
    }
  })
}