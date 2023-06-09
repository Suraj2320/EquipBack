const { Schema, model } = require("mongoose")



const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        unique:true
    },
    lastname: {
        type: String,
        required: true,
        unique:true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
     
    }
}, { timestamps: true });

const UserModel = model("user", UserSchema)


module.exports = UserModel