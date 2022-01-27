const express = require("express")
const app = express()

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


require("./database/init")
const userModel = require("./model/user")


app.post("/user/signup", async (req, res) => {
    try {
        const { name, username, password } = req.body
        const result = await userModel.create(req.body)
        console.log(result);
        res.send(result)
    } catch (error) {
        res.send(error.errors[0].message || error)
    }
})




app.listen(port = process.env.PORT || 3000, () => {
    console.log(`server runing on : http://localhost:${port}`)
})