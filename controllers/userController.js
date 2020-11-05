const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./../model/users");

// Showing signup form
exports.signup = (req, res) => {
  res.render('register')
}

// Showing login form
exports.signin = (req, res) => {
  res.render('login')
}

//Signup Logic
exports.register = (req, res) => {
  const { first_name, last_name, email, phone, password, confirm_password } = req.body
  let errors = []
  if(!first_name || !last_name || !email || !phone || !password) {
    errors.push({msg: '*Please fill all the fields'})
  }

  if(password != confirm_password) {
    errors.push({ msg: 'Password do not match'})
  }

  if(password.length < 8) {
    errors.push( { msg: 'Password must be atleast 8 characters long' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      first_name,
      last_name,
      email,
      phone
    })
  }else {
    User.findOne({ email: email })
    .exec()
    .then((user) => {
      if (user) {
        errors.push({msg: 'Email already exists'})
        return res.render('register', {
          errors,
          first_name,
          last_name,
          email,
          phone
        })
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
                req.flash('success_msg', 'Registration Successful!, Please log in')
                //res.render('login')
                res.redirect('/api/auth/login')
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
  }
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
            req.flash('error_msg', 'Invalid password!')
            res.redirect('login')
          }
          else{
            const token = jwt.sign({ name: user.first_name }, process.env.JWT_SECRET, {
              expiresIn: "2h",
            });
            res.render('dashboard', {token,  name: user.first_name})
            //res.redirect('/dashboard')
          }
        })
        .catch((err) => {
          res.status(500).json({error: err})
          // req.flash('error_msg', 'Invalid username or password')
          // res.redirect('/api/auth/login')
        });
    })
    .catch((err) => {
      req.flash('error_msg', 'User do not exists')
      res.redirect('/api/auth/login')
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