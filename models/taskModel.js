const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
  return sequelize.define('task', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Cette tâche existe deja'
      },
      validate: {
        notEmpty: {
          msg: 'Veuillez mettre un titre pour la tache'
        }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Veuillez selectiionner le type de priorite'
        },
        isIn: {
          args: [['Basse', 'Moyenne', 'Haute']],
          msg:'La priorité n\'est pas valide'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:'en-cours',
      validate: {
        notEmpty: {
          msg: 'Veuillez selectionner le statut'
        },
        isIn: {
          args: [['en-cours', 'terminée']],
          msg:'Le statut n\'est pas valide'
        }
      }
    },
    deadline: {
      type: DataTypes.DATE,
    }
  })
}