const repairmanModel = require("../model/repairman")
const taskModel = require("../model/task")

const { generateToken } = require("../utils/jwt")


async function signup(req, res) {
    try {
        const { name, username, password, skill } = req.body
        const result = await repairmanModel.create({ name, username, password, skill })
        res.send(result)
    } catch (error) {
        res.status(400).send(error.errors[0].message || error)
    }
}


async function login(req, res) {
    try {
        const { username, password } = req.body
        const userinformation = await repairmanModel.findOne({
            where: {
                username, password
            }
        })
        if (userinformation) {
            const token = `token : ${generateToken(userinformation.dataValues.id)}`
            return res.send(token)
        }
        else {
            return res.status(401).send("username or password is not correct ")
        }
    } catch (error) {
        return res.status(401).send(error)
    }
}




async function getAllTasksByRepairman(req, res) {
    try {
        const { repairman_id } = req.params
        const repairman_id_byToken = req.id
        if (repairman_id != repairman_id_byToken) {
            return res.send("permisson denied")
        }
        const tasks = await taskModel.findAll({
            where:
            {
                repairman_id
            }
        })

        res.send(tasks)
    } catch (error) {
        res.send(error)
    }
}



async function finishAndSetCost(req, res) {
    try {
        const { cost, task_id } = req.body
        const repairman_id = req.id
        console.log(repairman_id);
        const result = await taskModel.update({ cost: cost, isFinished: true }, {
            where: {
                repairman_id,
                task_id,
                cost: 0

            }
        })

        if (result != 1) {
            return res.send("didnt any row change")
        }
        res.send("update succesfuly")
    } catch (error) {
        res.send(error)
    }
}


module.exports = {
    signup,
    login,
    getAllTasksByRepairman,
    finishAndSetCost

}