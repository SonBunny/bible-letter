require("dotenv").config()


const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const letterRoutes = require("./routes/letterRoutes");
const connectDatabase = require("./config/db")


const app = express();

connectDatabase()

console.log(process.env.CLIENT_URL);
app.use(cors({
  origin: process.env.CLIENT_URL
}))

app.use(express.json());
app.use("/api/letters", letterRoutes);


app.get("/", (req, res) => {
  res.send("Bible Letter Gift API is running!!!")
});



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});