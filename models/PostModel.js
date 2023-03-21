import mongoose from "mongoose";

const schema = new mongoose.Schema({
    TenKhachHang: {
        type: String,
        required: true
    },
    SdtKhachHang: {
        type: String,
        required: true
    },
    DiaChiKhachHang: {
        type: String,
        required: true
    },
    TenDonHang: {
        type: String,
        required: true
    },
    GiaTien: {
        type: String,
        required: true
    },
    attachment: String,
}, { timestamps: true });

export const PostModel = mongoose.model('Post', schema);