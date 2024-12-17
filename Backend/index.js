const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')

app.use(cors())
app.get('/', function (req, res) {
    res.send("Hello world")
})

app.get('/api/user', function (req, res) {
    res.json({ name: "shubhanker", rollNo: 1909 })
})

app.listen(port, () => {
    console.log("Example app listening on port ", port)
})