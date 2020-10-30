const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./../model/users");

//Signup Logic
exports.register = (req, res) => {
    const {first_name, last_name, email, password, phone} = req.body
    User.find({ email: email })
      .exec()
      .then((user) => {
        if (user.length > 0) {
          return res.status(409).json({ message: "User already exists" });
        } else {
          bcrypt.hash(password, 12, (err, hashedPassword) => {
            if (err) {
              res.status(500).json({
                error: err,
              });
            }
            const user = new User({
              first_name,
              last_name,
              email,
              phone,
              password: hashedPassword
            });
  
            user
              .save()
              .then((result) => {
                res.render('login', {msg: 'Sign up successful!'})
                res.status(200).json({
                  message: "User Created successfully!",
                  createdUser: result,
                });
              })
              .catch((err) => {
                res.render('register', {msg: 'Error signing up',
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone
              })
                res.status(500).json({
                  message: "Invalid Email!",
                  error: err,
                });
              });
          });
        }
      });
  };

//Redirect to Pages
exports.signup = (req, res) => {
  res.redirect('register')
}
exports.signin = (req, res) => {
  res.redirect('login')
}
  
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
  