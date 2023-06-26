import { subWeeks, subMonths, format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { ListBuyNftModel } from '../models/ListBuyNftModel.js';
import { ListNftModel } from "../models/ListNftModel.js";
export const totalSum = async (req, res) => {
    try {
        const items = await ListNftModel.find({});
        let totalValue = 0;
    
        items.forEach((item) => {
          totalValue += parseFloat(item.price)
        });
        res.json({ totalValue });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

export const sortDateDashboard = async (req, res) => {
  try {
    let startDate;
    let endDate;

    const timeRange = req.query.timeRange;

    if (timeRange === '1w') {
      endDate = endOfWeek(new Date());
      startDate = subWeeks(endDate, 1);
    } else if (timeRange === '2w') {
      endDate = endOfWeek(new Date());
      startDate = subWeeks(endDate, 2);
    } else if (timeRange === '3w') {
      endDate = endOfWeek(new Date());
      startDate = subWeeks(endDate, 3);
    } else if (timeRange === '1m') {
      endDate = endOfMonth(new Date());
      startDate = subMonths(endDate, 1);
    } else {
      // Handle invalid timeRange value
      return res.status(400).json({ error: 'Invalid timeRange value' });
    }

    const startDateFormatted = format(startDate, 'yyyy-MM-dd');
    const endDateFormatted = format(endDate, 'yyyy-MM-dd');

    const pipeline = [
      {
        $match: {
          createdAt: {
            $gte: new Date(startDateFormatted),
            $lte: new Date(endDateFormatted),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt',
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: { $concat: ['Ngày ', { $substr: ['$_id', 8, 2] }] },
          value: { $toString: '$count' },
        },
      },
    ];

    const result = await ListNftModel.aggregate(pipeline);

    res.json(result);
  } catch (err) {
    // Handle error
  }
};








