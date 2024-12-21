const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')
const connectToMongo = require('./db/connectToDb')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', function (req, res) {
    res.send("Hello world")
})

app.use('/api/merchant', require('./routes/merchant registration/merchantRegistration'))

app.listen(port, () => {
    console.log("Example app listening on port ", port)
})

connectToMongo()