const express = require("express");
const bodyParser = require("body-parser") ;
const cors = require("cors");
//cors- cross origin resource sharing


const db = require('./db');  

const app = express();
const productRouter = require('./routes/productRouter');

var corsOptions = {
    origin: "http://localhost:3000"
}  

app.use(cors(corsOptions));
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({extended:true}))

db.on('error', console.error.bind(console, 'MongoDB connection error'))

app.get("/", (req,res) => {
    res.json({message : "Welcome to food ordering"})
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
} ) ;

app.use('/api/', productRouter);