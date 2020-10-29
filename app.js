const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

// EJS
app.set('view engine', 'ejs');

//Static folder
app.use(express.static('./public'));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello Word')
})

//Routes

//Server
const port = 5000
app.listen(port, () => console.log(`Server running on port ${port}`))