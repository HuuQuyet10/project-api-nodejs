import mongoose from "mongoose";

const schema = new mongoose.Schema({
    mail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nameUser: {
        type: String,
        required: true
    },

});

export const UserModel = mongoose.model('User', schema);