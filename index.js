const express = require("express")
const app = express()

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


require("./database/init")

const userModel = require("./model/user")
const { verifyToken, generateToken } = require("./utils/jwt")

app.use("/user" , require("./router/user"))





app.listen(port = process.env.PORT || 3000, () => {
    console.log(`server runing on : http://localhost:${port}`)
})