
exports.home = (req, res) => {
    res.render('home')
}

exports.register = (req, res) => {
    res.render('register', {msg: 'Welcome'})
}

exports.login = (req, res) => {
    res.render('login', {msg: 'Welcome'})
}

