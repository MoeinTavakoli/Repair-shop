const express = require("express")
const app = express()

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


require("./database/init")
const userModel = require("./model/user")
const { verifyToken, generateToken } = require("./utils/jwt")

app.post("/user/signup", async (req, res) => {
    try {
        const { name, username, password } = req.body
        const result = await userModel.create(req.body)
        res.send(result)
    } catch (error) {
        res.send(error.errors[0].message || error)
    }
})


app.post("/user/login", async (req, res) => {
    try {
        const { username, password } = req.body
        const userinformation = await userModel.findOne({
            where: {
                username, password
            }
        })
        if (userinformation) {
            const token = `token : ${generateToken(userinformation.dataValues.User_id)}`
            return res.send(token)
        }
        else {
            return res.status(401).send("username or password is not correct ")
        }
    } catch (error) {
        return res.status(401).send(error)
    }
})







app.listen(port = process.env.PORT || 3000, () => {
    console.log(`server runing on : http://localhost:${port}`)
})