const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//jwt token function
const age = 1 * 24 * 60 * 60;
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_STRING, { expiresIn: age });
}

//signup
module.exports.signup = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.signup(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: age * 3 });
        res.status(200).json({ email, token });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

//login
module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: age * 3 });
        res.status(200).json({ email, token });
    }catch(error){
        res.status(401).json({ error: error.message });
    }
}