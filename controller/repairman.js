const repairmanModel = require("../model/repairman")
const { generateToken } = require("../utils/jwt")

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




module.exports = {
    signup,
    login
}