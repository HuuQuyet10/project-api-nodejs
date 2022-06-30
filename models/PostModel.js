import mongoose from "mongoose";

const schema = new mongoose.Schema({
    MaDonHang: {
        type: String,
        required: true
    },
    NgayThang: {
        type: Date,
        required: true
    },
    TenKhachHang: {
        type: String,
        required: true
    },
    SdtKhachHang: {
        type: String,
        required: true
    },
    EmailKhachHang: {
        type: String,
        required: false
    },
    DiaChiKhachHang: {
        type: String,
        required: true
    },
    TenNguoiChuyenTien: {
        type: String,
        required: true
    },
    SdtNguoiChuyenTien: {
        type: String,
        required: true
    },
    DiaChiNguoiChuyenTien: {
        type: String,
        required: true
    },
    PhuongThucThanhToan: {
        type: String,
        required: true
    },
    TenQuanLy: {
        type: String,
        required: true
    },
    TenNhanVienSale: {
        type: String,
        required: true
    },
    TenDonHang: {
        type: String,
        required: true
    },
    QuaTang: {
        type: String,
        required: true
    },
    GiaTien: {
        type: String,
        required: true
    },
    TrackingURL: {
        type: String,
        required: true
    },
    attachment: String,
}, { timestamps: true });

export const PostModel = mongoose.model('Post', schema);