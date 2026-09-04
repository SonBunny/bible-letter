const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const letterRoutes = require("./routes/letterRoutes");

const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/letters", letterRoutes);


app.get("/", (req, res) => {
  res.send("Bible Letter Gift API is running!!!")
});



const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});