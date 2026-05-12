require('dotenv').config();
const { connect } = require('mongoose');
const app= require ('./src/app');
const connectDB = require("./src/config/db")

connectDB();

const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
   res.send("Backend API Running Successfully 🚀")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});