const bcrypt = require('bcryptjs')

const users = []


module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        console.log(username)
        console.log(users[i])
        if (users[i].username === username) {
          let exisitingUser = bcrypt.compareSync(password, users[i].hash)
          if(exisitingUser){
            // users[i].push(userObj)
            let userReturn = {...users[i]}
            delete userReturn.hash
            console.log(userReturn)
            res.status(200).send(userReturn)
          }

        } else {
          res.status(400).send("User not found.")

        }
      }
    },
    register: (req, res) => {

      console.log('Registering User')
      // console.log(req.body)
      // users.push(req.body)
      
      const salt = bcrypt.genSaltSync(5)
      const hash = bcrypt.hashSync(req.body.password, salt)
      
      let userObj = {
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        hash
      }
      
      users.push(userObj)
      
      let hashDeleted = {...userObj}
      delete hashDeleted.hash
      
      res.status(200).send(hashDeleted)
    }
}