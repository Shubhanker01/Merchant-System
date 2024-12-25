const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')
const connectToMongo = require('./db/connectToDb')
const cookieParser = require('cookie-parser')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.get('/', function (req, res) {
    res.send("Hello world")
})

app.use('/api/merchant', require('./routes/merchant registration/merchantRegistration'))

app.listen(port, () => {
    console.log("Example app listening on port ", port)
})

connectToMongo()