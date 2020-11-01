
exports.home = (req, res) => {
    res.render('home')
}

exports.register = (req, res) => {
    res.render('register', {msg: 'Welcome', error: ''})
}

exports.login = (req, res) => {
    res.render('login', {msg: 'Welcome', error: ''})
}

