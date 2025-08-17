const { ValidationError } = require("sequelize")
const { Users } = require("../models")
const bcrypt = require('bcrypt')


//Créé un utilisateur
exports.createUser = (req, res) => {
  const { firstname, lastname, email, password } = req.body
  if (!firstname || !lastname || !email || !password) {
    res.status(400).json({
      message: 'Veuillez remplir tout les champs'
    })
  } else {
    Users.findOne({ where: { email: email } })
      .then((existing => {
        if (existing) {
          res.status(400).json({
            message: "L'utilisateur existe deja "
          })
        } else {
          bcrypt.hash(password, 10)
            .then((hash) => {
              Users.create({
                firstname,
                lastname,
                password: hash,
                email
              })
                .then(() => {
                  res.status(201).json({
                    message: 'Utilisateur créé avec succès'
                  })
                })
                .catch((error) => {
                  if (error instanceof ValidationError) {
                    res.status(400).json({
                      message: error.errors[0].message
                    })
                  }
                  else {
                    res.status(500).json({
                      message: 'Erreur du serveur'
                    })
                  }
                })
            })
            .catch(() => {
              res.status(500).json({
                message: 'Erreur du serveur'
              })
            })
        }
      }))
      .catch(() => {
        res.status(500).json({
          message: 'Erreur du serveur'
        })
      })
  }
}

//Récuperer un utilisateur

exports.getUser = (req, res) => {
  const id = req.user.userId
  Users.findByPk(id)
    .then((user) => {
      if (user) {
        res.status(201).json({
          data: user
        })
      } else {
        res.status(400).json({
          message: 'Aucun utilisateur ne conrespond a la demande'
        })
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'Erreur de serveur'
      })
    })
}

// Supprimer un utilisateur

exports.deleteUser = (req, res) => {
  const id = req.user.userId
  Users.findByPk(id)
    .then((user) => {
      if (user) {
        Users.destroy({
          where: { id: id }
        })
          .then((_) => {
            res.status(200).json({
              message: 'Utilisateur supprimé'
            })
          })
          .catch((_) => {
            res.status(500).json({
              message: 'Erreur du serveur'
            })
          })
      } else {
        res.status(400).json({
          message: 'Aucun utilisateur ne conrespond a la demande'
        })
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'Erreur de serveur'
      })
    })
}

//Mettre un utilisateur a jour

exports.updateUser = (req, res) => {
  const id = req.user.userId
  const { firstname, lastname, email, newPassword, oldPassword } = req.body
  Users.findByPk(id)
    .then((user) => {
      if (user) {
        if (!newPassword) {
          if (!firstname || !lastname || !email) {
            res.status(400).json({
              message: 'Veuillez remplir tout les champs'
            })
          }
          else {
            Users.update({
              firstname,
              lastname,
              email
            }, { where: { id: id } })
              .then(() => {
                res.status(200).json({
                  user:user,
                  message: 'Informations mis a jour avec succès'
                })
              })
              .catch((error) => {
                if (error instanceof ValidationError) {
                  res.status(400).json({
                    message: error.errors[0].message
                  })
                }
                else {
                  res.status(500).json({
                    message: 'Erreur du serveur'
                  })
                }
              })
          }
        }
        else {
          if (!oldPassword) {
            res.status(400).json({
              message: 'Veuillez saisir l\'ancien mot de passe'
            })
          }
          else {
            bcrypt.compare(oldPassword,user.password)
              .then((isCorrect) => {
                if (isCorrect) {
                  bcrypt.hash(newPassword, 10)
                    .then((hash) => {
                      Users.update({
                        password: hash
                      }, { where: { id: id } })
                        .then(() => {
                          res.status(200).json({
                            message: 'Mot de passe mis a jour avec succès'
                          })
                        })
                        .catch((error) => {
                          if (error instanceof ValidationError) {
                            res.status(400).json({
                              message: error.errors[0].message
                            })
                          }
                          else {
                            res.status(500).json({
                              message: 'Erreur du serveur'
                            })
                          }
                        })
                    })
                    .catch((error) => {
                      res.status(500).json({
                        message: 'Erreur du serveur'
                      })
                    })
                }
                else {
                  res.status(400).json({
                    message: 'Ancien mot de passe non conforme'
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
      }
      else {
        res.status(400).json({
          message: 'Aucun utilisateur ne conrespond a la demande'
        })
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'Erreur du serveur'
      })
    })
}