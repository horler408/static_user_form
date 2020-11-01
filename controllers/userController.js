const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./../model/users");

//Signup Logic
exports.register = (req, res) => {
  const { first_name, last_name, email, phone, password, confirm_password} = req.body
  User.find({ email: email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.render('register', {msg: "User Already Exist!", error: ''})
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              first_name,
              last_name,
              email,
              phone,
              password: hash
            });
            user
              .save()
              .then((result) => {
                res.render('login', {msg: 'You are welcome, Please log in', error: ''})
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
  };

//Login Logic
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: new Error("User not found!"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.render('login', 
            {msg: '', error: 'Invalid username or password!'})
          }
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "2h",
          });
          res.render('dashboard', {token, user: req.body.first_name})
        })
        .catch((err) => {
          res.render('login', {msg: '', error: err})
        });
    })
    .catch((err) => {
      res.render('login', {msg: '', error: err})
    });
};


  //Delete User
  exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.userId })
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
  
  exports.getUsers = (req, res) => {
    User.find().exec()
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(400).json({
        error: error
      })
    })
  }