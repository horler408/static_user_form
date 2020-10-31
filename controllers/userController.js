const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./../model/users");

//Signup Logic
exports.register = (req, res) => {
  const { first_name, last_name, email, phone, password } = req.body
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      res.json({
        error: err,
      });
    }
    const user = new User({
      first_name,
      last_name,
      email,
      phone,
      password: hash,
    });
    user
      .save()
      .then(() => {
        res.render('login', {msg: 'Registration successfull!'})
        res.status(201).json({
          message: "User added successfully",
        });
      })
      .catch((err) => {
        //res.render('register', {error: 'Registration failed!'})
        res.status(500).json({
          error: err
        });
      });
  });
  };

  //Login Logic
  exports.login = (req, res) => {
    const { email, password } = req.body
    User.find({ email: email })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          res.status(404).json({
            message: "User Not Found!",
          });
        }
        bcrypt.compare(password, user[0].password, (err, response) => {
          if (err) {
            res.status(401).json({
              message: "Invalid Username or Password!",
            });
          }
          if (response) {
            const token = jwt.sign(
              { email: user[0].email, userId: user[0].id },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );
            return res.render('dashboard')
            // return res.status(200).json({
            //   message: "Log in Successful!",
            //   token: token
            // });
          }
          res.status(401).json({
            message: "Invalid Username or Password!",
          });
        });
      })
      .catch((err) => {
        res.render('login', {msg: 'Invalid Username or Password!'})
        res.status(500).json({
          error: err,
        });
      });
  };
  
  //Delete User
  exports.deleteUser = (req, res) => {
    User.deleteOne({ id: req.params.userId })
      .exec()
      .then(() => {
        res.status(200).json({
          message: "User Deleted Successfully!",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  };
  