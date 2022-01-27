const requestModel = require("../model/request")

async function addRequest(req, res) {
    try {
        const { subject, message, skill } = req.body
        const user_id = req.id
        console.log(req.body);
        const result = await requestModel.create({ user_id, subject, message, skill })
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}




module.exports = { addRequest }