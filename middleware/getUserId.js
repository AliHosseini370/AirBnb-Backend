const jwt = require('jsonwebtoken')


const getUserId = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({error: 'authorization token required'})
    }
    const token = authorization.split(' ')[0]
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
        req.user = _id
        next()
    } catch (error) {
        return res.status(401).json({error: error.message})
    }
}

module.exports = {getUserId}