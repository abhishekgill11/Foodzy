// setting up express 
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors({ origin: 'http://localhost:3000' }));
const port = 4000
const  connectToMongo = require("./database")
// app.use((req,res,next ) => {
//     res.setHeader("Access-Control-Allow-Origin","https://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Header",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// })
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
connectToMongo();
app.get('/', (req, res) => {
    res.send('Yo')
})
app.use(express.json())
app.use('/api/', require("./Routes/CreateUser"));
app.use('/api/', require("./Routes/DisplayData"));
app.listen(port, () => {
    console.log(`Connected to Mongodb ${port}`)
})

