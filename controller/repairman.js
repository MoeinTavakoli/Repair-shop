const repairmanModel = require("../model/repairman")

async function signup(req, res) {
    try {
        const { name, username, password } = req.body
        const result = await repairmanModel.create({ name, username, password })
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
        console.log(repairman_id_byToken);
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

module.exports = {
    signup,
    login,
    getAllTasksByRepairman
}