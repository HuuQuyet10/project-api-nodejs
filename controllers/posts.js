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
        
        let {page, size} = req.query;
        if (!page) {
            page = 1;
        } else if (!size) {
            size = 10;
        }
        // page < 1 || false || undefined ? page = 1 : res.status(500).json({
        //     code: "500",
        //     error: "Vui lòng check lại paramater"
        // });

        const limit = parseInt(size);
        const skip = (page - 1) * size;

        await PostModel.find()
        .limit(limit)
        .skip(skip)
        .sort({_id:-1})
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
      const postId = req.params._id;
      await PostModel.deleteOne({ _id: postId });
      const notideletePost = {
        code: 200,
        status: "Xoá thành công"
      };
      res.json(notideletePost);
    } catch (err) {
      res.status(500).json({ error: err.message });
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
