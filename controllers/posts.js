import { PostModel } from "../models/PostModel.js";


// GET DATA VỀ
export const getPosts = async (req, res) => {
    try {
        // const post = new PostModel({
        //     title: 'test',
        //     content: 'test'
        // })
        // post.save();
        const posts = await PostModel.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err })
    }
};

// XEM DETAILS 1 POST
export const getPostByid = async (req, res) => {
    try {
        const posts = req.params._id;
        const postsByid = await PostModel.findOne({_id: posts});
        console.log(postsByid);
        res.json(`id là ${posts}`)
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
