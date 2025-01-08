const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')
const connectToMongo = require('./db/connectToDb')
const cookieParser = require('cookie-parser')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.get('/', function (req, res) {
    res.send("<h1>Hello world</h1>")
})

app.use('/api/merchant', require('./routes/merchant registration/merchantRegistration'))
app.use('/api/merchants', require('./routes/merchant login/merchantLogin'))
app.use('/api/merchant/password', require('./routes/merchant password/passwordReset'))
// forgot password route
app.use('/api/merchant', require('./routes/merchant password/forgotPassword'))

app.listen(port, () => {
    console.log("Example app listening on port ", port)
})

connectToMongo()