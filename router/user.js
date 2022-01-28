const express = require("express")
const app = express()

// middleware 
const verifyToken = require("../middleware/verifyToken")

// controller
const controller = require("../controller/user")
const { addRequest } = require("../controller/request")

app.post("/signup", controller.signup)
app.post("/login", controller.login)
app.get("/factor", verifyToken, controller.getFactor)
app.post("/request", verifyToken, addRequest)


module.exports = app