const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const path = require('path');

const dbConnect = require('./config/db')

const userRoute = require('./routes/userRoute');
const indexRoute = require('./routes/indexRoute')

const app = express()

//Static folder
app.use(express.static(path.join(__dirname, 'public')))
//app.use(express.static('./public'));

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs');


//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Db Configuration
dbConnect()

//Routes
app.use('/api/auth', userRoute);
app.use('/', indexRoute);

//Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`))