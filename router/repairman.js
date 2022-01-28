const express = require("express")
const app = express()

//  ctl
const controller = require("../controller/repairman")

// middleware
const verifyToken = require("../middleware/verifyToken")

app.post("/signup", controller.signup)
app.post("/login", controller.login)


app.get("/repairman/:repairman_id", verifyToken, controller.getAllTasksByRepairman)


module.exports = app