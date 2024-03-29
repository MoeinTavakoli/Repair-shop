const userModel = require("../model/user")
const taskModel = require("../model/task")

const { generateToken } = require("../utils/jwt")

async function signup(req, res) {
    try {
        const { name, username, password } = req.body
        const result = await userModel.create({ name, username, password })
        res.send(result)
    } catch (error) {
        res.status(400).send(error.errors[0].message || error)
    }
}


async function login(req, res) {
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
}



async function getFactor(req, res) {
    try {
        const user_id = req.id
        const factors = await taskModel.findAll({
            where: {
                user_id
            },
            attributes: ["task_id", "subject", "message", "cost"]
        })

        res.send(factors)
    } catch (error) {
        res.send(error)
    }
}



module.exports = {
    signup,
    login,
    getFactor

}