import { ListBuyNftModel } from "../models/ListBuyNftModel.js";
import { ListNftModel } from "../models/ListNftModel.js";
const PAGE_SIZE = 10;


// GET DATA VỀ
export const getListBuyNft = async (req, res) => {
    try {
        // const post = new ListBuyNftModel({
        //     name: 'test',
        //     linkavatar: 'test',
        //     description: "tesst",
        //     totalSell: 'test',
        //     authornft: 'test',
        //     contractnft: 'test',
        //     price: 'test',
        //     hasCheck: true
        // })
        // post.save();
        let {page, size} = req.query;
        if (!page) {
            page = 1;
        } else if (!size) {
            size = 10;
        }
        const limit = parseInt(size);
        const skip = (page - 1) * size;

        await ListBuyNftModel.find()
        .limit(limit)
        .skip(skip)
        .sort({_id:-1})
        .then(data => {
            const total = data.length === 0 ? 0 : data.length;
            const response = {
                code: 200,
                data: data || [],
                total: total
            };
            res.status(200).json(response);
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

// XEM DETAILS 1 NFT
export const getNftByid = async (req, res) => {
    try {
        const bodyNft = req.params._id;
        const bodyNftByid = await ListBuyNftModel.findOne({_id: bodyNft});
        res.json(bodyNftByid)
    } catch (err) {
        res.status(500).json({ error: err });
    }
}


// TẠO MỘT NFT MỚI
const checkDuplicateName = async (name) => {
    try {
        const existingPost = await ListNftModel.findOne({ name: name });
        return existingPost !== null;
    } catch (err) {
        throw err;
    }
}
export const createNft = async (req, res) => {
    try {
        const newBodyNft = req.body;
        const hasDuplicateName = await checkDuplicateName(newBodyNft.name);
        
        if (hasDuplicateName) {
            newBodyNft.hasCheck = false;
        } else {
            newBodyNft.hasCheck = true;
        }

        const bodyNft = await new ListBuyNftModel(newBodyNft);
        await bodyNft.save();
        
        const notiCreateNft = {
            "code": 200,
            "status": "Thêm thành công"
        }
        res.json(notiCreateNft);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// CẬP NHẬT MỘT NFT
export const updateNft = async (req, res) => {
    try {
        const updateNft = req.body;
        const bodyNft = await ListBuyNftModel.findOneAndUpdate({ _id: updateNft._id }, updateNft, { new: true });

        if (!bodyNft) {
            throw new Error("Không tìm thấy ID hoặc sai ID");
        }

        await bodyNft.save();

        const notiUpdateNft = {
            code: 200,
            status: "Cập nhật thành công"
        };

        res.json(notiUpdateNft);
    } catch (err) {
        if (err.name === "CastError" && err.path === "_id") {
            res.status(400).json({ error: "Thiếu id hoặc không tìm thấy id" });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
}



// XOÁ MỘT NFT THEO ID
export const deleteNft = async (req, res) => {
    try {
      const boxNftId = req.params._id;
      await ListBuyNftModel.deleteOne({ _id: boxNftId });
      const notideleteNft = {
        code: 200,
        status: "Xoá thành công"
      };
      res.json(notideleteNft);
    } catch (err) {
        if (err.name === "CastError" && err.path === "_id") {
            res.status(400).json({ error: "Thiếu id hoặc không tìm thấy id" });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

// TÌM KIẾM 1 NFT THEO TÊN NFT (SEARCH PRODUCT BY NAME)

export const searchNameProductNft = async (req, res) => {
    try {
      const keyWordSearch = req.params.name;
      const bodyNft = await ListBuyNftModel.find({ name: { $regex: keyWordSearch } });
      if (!bodyNft) {
        res.status(400).json({
          code: "400",
          status: "Vui lòng nhập đúng tên cần tìm"
        });
      }
  
      const data = bodyNft.length > 0 ? bodyNft : [];
      const total = bodyNft.length;
  
      res.json({
        code: 200,
        data: data,
        total: total
      });
    } catch (error) {
      res.status(401).json({
        err: error
      });
    }
  };
  