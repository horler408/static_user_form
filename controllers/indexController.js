
exports.home = (req, res) => {
    res.render('home')
}

exports.dashboard = (req, res) => {
    res.render('dashboard', {name: req.user.first_name})
}

exports.admin = (req, res) => {
    res.render('admin')
}


