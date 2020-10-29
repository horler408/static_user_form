const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const dbConnect = require('./config/db')

const userRoute = require('./routes/userRoute')

const app = express()

// EJS
app.set('view engine', 'ejs');

//Static folder
app.use(express.static('./public'));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Db Configuration
dbConnect()

app.get('/', (req, res) => {
    res.render('home')
})

//Routes
app.use('/api/auth', userRoute)

//Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`))