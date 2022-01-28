const express = require("express")
const app = express()

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


require("./database/init")


app.use("/user", require("./router/user"))
app.use("/repairman", require("./router/repairman"))
app.use("/admin", require("./router/admin"))


const requestModel = require("./model/request")
const taskModel = require("./model/task")
const repairmanModel = require("./model/repairman")

app.get("/admin/request", async (req, res) => {
    try {
        const allRequests = await requestModel.findAll()
        if (allRequests.length == 0) {
            return res.send("there is no request added")
        }
        res.send(allRequests)
    } catch (error) {
        res.send(error)
    }
})


app.delete("/admin/request", async (req, res) => {
    try {
        const { request_id } = req.body
        const result = await requestModel.destroy({
            where: {
                request_id
            }
        })
        if (result == 1) {
            res.send("deleted")
        }
        else {
            res.send(`couldnt find request by this id : ${request_id}   !`)
        }
    } catch (error) {
        res.send(error)
    }
})

const verifyToken = require("./middleware/verifyToken")


app.put("/admin/request", verifyToken, async (req, res) => {
    try {
        const { request_id, repairman_id } = req.body
        const requestInformation = (await requestModel.findByPk(request_id)).dataValues
        if (!requestInformation) {
            return res.send("counlednt find request by this id ")
        }

        const result = await repairmanModel.findByPk(repairman_id, { attributes: ['skill'] })

        if (!result) {
            return res.send("repairman not found ")
        }

        const repairman = result.dataValues


        if (repairman.skill !== requestInformation.skill) {
            return res.send("repairman skill  does not your request skill")
        }


        const payload = {
            repairman_id, admin_id: req.id, user_id: requestInformation.user_id,
            subject: requestInformation.subject, message: requestInformation.message,
            skill: requestInformation.skill
        }

        const resCreate = await taskModel.create(payload)
        if (resCreate) {
            return res.send(resCreate)
        }
        else {
            res.send("create task faild")
        }
    } catch (error) {
        res.send(error)
    }
})








app.listen(port = process.env.PORT || 3000, () => {
    console.log(`server runing on : http://localhost:${port}`)
})