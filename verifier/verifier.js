const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const verifier = async (req, res, next) => {
    //get the authorization value
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({ error: "Authorization is required!" });
    }

    //get token from authorization value
    const token = authorization.split(' ')[1];

    try{
        const { _id } = jwt.verify(token, process.env.SECRET_STRING);

        //find a user based on this id and store on the request object
        req.user = await User.findOne({ _id }).select('_id');
        next();
    }catch(error){
        res.status(401).json({ error: "Not Authorized" });
    }
}

module.exports = verifier;