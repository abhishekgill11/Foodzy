// setting up express 
const express = require('express')
const app = express()
const port = 3000
const  connectToMongo = require("./database");
connectToMongo();
app.get('/', (req, res) => {
    res.send('Yo')
})
app.use('/api/', require("./Routes/CreateUser"))
app.listen(port, () => {
    console.log(`Connected to Mongodb ${port}`)
})

