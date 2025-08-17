const express=require('express')
const auth = require("../middlewares/auth")
const { createUser, getUser, deleteUser, updateUser } = require("../controllers/userController")

const router=express.Router()

//Créé un utilisateur
router.post('/',createUser)

//Recuperer un utilisateur

router.get('/',auth,getUser)

//Supprimer un utilisateur

router.delete('/',auth,deleteUser)

//Mettre les infos d'un utilisateur a jour

router.patch('/',auth,updateUser)

module.exports=router