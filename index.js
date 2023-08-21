const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use('/api/auth',userRoutes)
// mongoose.connect(process.env.MONGO_URL,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
// }).then(() => {
//     console.log("Db connected");
// }).catch((err) => {
//     console.log("error in connection",err.message);
// })
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL); 
  console.log("database connected");
}


const server = app.listen(process.env.PORT,()=>{
    console.log(`running on port ${process.env.PORT}`);
})
