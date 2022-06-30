import { PostModel } from "../models/PostModel.js";


const PAGE_SIZE = 10;


// GET DATA VỀ
export const getPosts = async (req, res) => {
    try {
        // const post = new PostModel({
        //     title: 'test',
        //     content: 'test'
        // })
        // post.save();
        var page = parseInt(req.query.page); // lấy ra số lượng page mà bên client truyền lên.
        // page < 1 ? page = 1 : res.status(500).json({
        //     code: "500",
        //     error: "Vui lòng check lại paramater"
        // });
        var soLuongBoQua = (page - 1) * PAGE_SIZE; // khoảng cách giữa các page, nếu client truyền lên là page 1. thì sẽ lấy 10 document đầu tiên, nếu clien truyền lên 2 sẽ lấy 10 document tiếp theo bắt đầu từ document số 10
        await PostModel.find()
        .skip(soLuongBoQua)
        .limit(PAGE_SIZE)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                code: "500",
                error: "Vui lòng check lại paramater"
            })
        })
    } catch (err) {
        res.status(500).json({ error: err })
    }
};

// XEM DETAILS 1 POST
export const getPostByid = async (req, res) => {
    try {
        const posts = req.params._id;
        const postsByid = await PostModel.findOne({_id: posts});
        res.json(postsByid)
    } catch (err) {
        res.status(500).json({ error: err });
    }
}


// TẠO MỘT BÀI VIẾT MỚI
export const createPost = async (req, res) => {
    try {
        const newPost = req.body;
        const post = await new PostModel(newPost);
        await post.save();
        const notiCreatePost = {
            "code": 200,
            "status": "Thêm thành công"
        }
        res.json(notiCreatePost);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// CẬP NHẬT MỘT POST
export const updatePost = async (req, res) => {
    try {
        const updatePost = req.body;
        const post = await PostModel.findOneAndUpdate({ _id: updatePost._id }, updatePost, { new: true });
        await post.save();
        const notiUpdatePost = {
            "code": 200,
            "status": "Cập nhật thành công"
        }
        res.json(notiUpdatePost);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// XOÁ MỘT POST THEO ID
export const deletePost = async (req, res) => {
    try {
        const deletePost = req.params._id;
        const post = await PostModel.deleteOne({ _id: deletePost });
        await post.save();
        const notideletePost = {
            "code": 200,
            "status": "Xoá thành công"
        }
        res.json(notideletePost)
    } catch (err) {
        res.status(500).json({ error: err });
    }
};


// TÌM KIẾM 1 POST THEO TÊN ĐƠN HÀNG (SEARCH PRODUCT BY NAME)

export const searchNameProductor = async (req, res) => {
    try {
        const keyWordSearch = req.params.TenDonHang;
        const posts = await PostModel.find({TenDonHang: {$regex: keyWordSearch} });
        res.json(posts)
    } catch (error) {
        res.status(401).json({
            err: error
        })
    }  
}
