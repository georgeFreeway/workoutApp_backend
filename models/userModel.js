const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

//user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true } );

//sign up function on the user document
userSchema.statics.signup = async function(email, password){
    const self = this;

    if(!email || !password){
        throw Error('all fields must be filled dumb dumb!');
    }

    if(!validator.isEmail(email)){
        throw Error('please enter a valid Email Address');
    }

    if(!validator.isStrongPassword(password)){
        throw Error('password must be atleast 8 characters long containing an upper case (A-Z) and symbols');
    }

    const isExists = await self.findOne({ email });

    if(isExists){
        throw Error('please use another Email Address. This one already exisits');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await self.create({ email, password: hash });
    return user;
    
}

userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('Fill up all fields!');
    }
    const self = this;
    const user = await self.findOne({ email });

    if(user){
        const compare = await bcrypt.compare(password, user.password);

        if(compare){
            return user;
        }
        throw Error('password does not match. Try again!');
    }

    throw Error('Email does not exist!');
}

const User = model('user', userSchema);

module.exports = User;