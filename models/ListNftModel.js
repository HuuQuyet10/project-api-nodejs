import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    linkavatar: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    totalSell: {
        type: String,
        required: true
    },
    authornft: {
        type: String,
        required: true
    },
    contractnft: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    attachment: String,
}, { timestamps: true });

export const ListNftModel = mongoose.model('ListNft', schema);