const mongoose=require('mongoose')

// define the mongodb connection url
const mongoURL="mongodb://127.0.0.1:27017/hotels"

// setup mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// get default connection
// mongoose maintains a default connection object reprenting the mongodb connection
const db = mongoose.connection

db.on('connected',()=>{
    console.log("Connected to mongodb server")
})
db.on('error',(err)=>{
    console.log("mongodb connection error: ",err)
})
db.on('disconnected',()=>{
    console.log("mongodb disconnected")
})

// export the database connection
module.exports = db