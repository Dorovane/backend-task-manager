const { DataTypes } = require('sequelize')

module.exports=(sequelize)=>{
  return sequelize.define('users',{
    id:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    lastname:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          message:'Champs nom vide'
        },
        len: {
          args: [2, 50],
          msg: 'Le nom doit contenir entre 2 et 50 caractères'
        },
        isAlpha: {
          msg: 'Le nom ne peut contenir que des lettres'
        }
      }
    },
    firstname:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'Champs prénom vide'
        },
        len: {
          args: [2, 50],
          msg: 'Le prénom doit contenir entre 2 et 50 caractères'
        },
        isAlpha: {
          msg: 'Le prénom ne peut contenir que des lettres'
        }
      }
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'Champs mot de passe vide'
        }
      }
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:{
        message:'Cet email existe déja'
      },
      validate:{
        isEmail:{
          message:'Veuillez entrer un email valide'
        },
        notEmpty:{
          message:'Champs email vide'
        }
      }
    }
  })
}