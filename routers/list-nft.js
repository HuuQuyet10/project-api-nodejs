import express from "express";
import { createNft, deleteNft, getListNft, getNftByid, searchNameProductNft, updateNft } from "../controllers/list-nft.js";
import { checkMiddleware } from "../middleware/auth.js";
const router = express.Router();

// GET ALL NFT
router.get('/', checkMiddleware , getListNft);

// GET NFT BY ID
router.get('/:_id', checkMiddleware, getNftByid);

// CREATE NEW ONE NFT
router.post('/', checkMiddleware, createNft);

// UPDATE ONE NFT
router.post('/update', checkMiddleware, updateNft);

// DELETE ONE NFT BY ID
router.delete('/delete/:_id', checkMiddleware, deleteNft);


// TÌM KIẾM 1 NFT THEO TÊN NFT (SEARCH NFT BY NAME)
router.get('/search/:name', checkMiddleware, searchNameProductNft);


export default router;