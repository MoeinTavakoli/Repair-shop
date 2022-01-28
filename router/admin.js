const express = require("express")
const app = express()

// middleware 
const verifyToken = require("../middleware/verifyToken")

// controller
const controller = require("../controller/admin")
const requestController = require("../controller/request")


app.post("/signup", controller.signup)
app.post("/login", controller.login)

app.get("/request", verifyToken, requestController.getAllRequests)
app.delete("/request", verifyToken, requestController.deleteRequest)
app.put("/request", verifyToken, requestController.acceptRequest)


module.exports = app