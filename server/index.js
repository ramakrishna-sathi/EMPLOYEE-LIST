require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

const authRoutes = require("./routes/auth");
const router = require("./routes/router");
// database connection
connection();

// middlewares
app.use(express.static('images'))
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.json("server start")
})

// routes

app.use("/api/auth", authRoutes);
app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));
