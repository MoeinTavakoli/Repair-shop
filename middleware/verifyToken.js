const { decodeToken } = require("../utils/jwt")


function verificationToken(req, res, next) {
    try {
        const token = req.headers.authorization
        const id = decodeToken(token).id
        req.id = id
        next()
    } catch (error) {
        res.status(500).json({ success: false, error: "token is not valid  or expire !" })
    }
}


module.exports = verificationToken