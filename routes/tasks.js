const auth = require("../middlewares/auth")

const express=require('express')
const { getTasks, addTask, deleteTask, getTask, updateTask, checkedTask } = require("../controllers/taskController")

const router=express.Router()

//Recuperer toutes les taches 
router.get('/',auth,getTasks)


//Enregistrer une tache 
router.post('/',auth, addTask)

//Supprimer une tache
router.delete('/:id',deleteTask)

//Recuperer une tache
router.get('/:id',getTask)

//Mise a jour d'une tache

router.put('/:id',auth, updateTask)

//Maj partielle
router.patch('/:id',checkedTask)

module.exports=router