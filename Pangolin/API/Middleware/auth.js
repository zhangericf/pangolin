const jwt = require('jsonwebtoken');
const { Pangolin } = require('../Model/PangolinTest');

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, "IReallyNeedATraineeship2020")
    try {
        const user = await Pangolin.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send( data._id + " " + token + " " + { error: 'Not authorized to access this resource' })
    }

}
module.exports = auth