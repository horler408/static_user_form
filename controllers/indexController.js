
exports.home = (req, res) => {
    res.render('home')
}

exports.dashboard = (req, res) => {
    res.render('dashboard', {user: req.user})
}


