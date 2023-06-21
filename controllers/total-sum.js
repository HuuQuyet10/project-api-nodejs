import { ListNftModel } from "../models/ListNftModel.js";
export const totalSum = async (req, res) => {
    try {
        const items = await ListNftModel.find({});
        let totalValue = 0;
    
        items.forEach((item) => {
          totalValue += parseFloat(item.price)
        });
        // console.log(items, "kkkkkkkk")
    
        res.json({ totalValue });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}