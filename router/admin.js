const express = require("express")
const app = express()

// middleware 
const verifyToken = require("../middleware/verifyToken")

// controller
const controller = require("../controller/admin")

app.post("/signup", controller.signup)
app.post("/login", controller.login)
// app.post("/request", verifyToken, addRequest)


module.exports = app