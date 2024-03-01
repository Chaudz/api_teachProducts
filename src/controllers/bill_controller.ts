import { Request, Response } from "express";
import Bill from "../models/bill";
import Order from "../models/order";
import OrderItem from "../models/orderItem";
import Product from "../models/product";
import { Types } from "mongoose";

class BillController {
  async getBillByOrderId(req: Request, res: Response) {
    try {
      const orderId = req.params.orderId;
      const billDetail = await Order.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(orderId),
          },
        },
        {
          $lookup: {
            from: "orderitems",
            localField: "_id",
            foreignField: "order_id",
            as: "items",
          },
        },
        {
          $project: {
            _id: 1,
            items: "$items",
          },
        },
      ]);

      res.status(200).json({ billDetail });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createBill(req: Request, res: Response) {
    try {
      const orderId = req.body.orderId;
      const order = await Order.findById(orderId);
      if (!order) {
        res.status(403).json("not found order");
      }

      const newBill = new Bill({
        total_amount: order?.total_amount,
        order_id: orderId,
      });
      newBill.save();

      res.status(200).json(newBill);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async removeBill(req: Request, res: Response) {
    try {
      const billId = req.body.billId;
      console.log(billId);
      const result = await Bill.findByIdAndDelete(billId);

      if (result) {
        res.status(200).json({ message: "Bill removed successfully" });
      } else {
        res.status(404).json({ message: "Bill not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new BillController();
