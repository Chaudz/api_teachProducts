import { Request, Response } from "express";
import Order from "../models/order";
import Product from "../models/product";
import OrderItem from "../models/orderItem";

enum STATUS {
  choxacnhan,
  dangvanchuyen,
  hoanthanh,
  dahuy,
}

class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const { customerId, items, phone, address } = req.body;
      const itemList = JSON.parse(items);

      // Tạo một Order mới
      const newOrder = new Order({
        customer_id: customerId,
        order_phone: phone,
        order_address: address,
      });

      // Lưu Order vào cơ sở dữ liệu
      const createdOrder = await newOrder.save();

      // Lặp qua danh sách sản phẩm và tạo OrderItem cho mỗi sản phẩm
      const orderItems = [];
      let totalAmount = 0;
      for (const item of itemList) {
        const { productId, quantity }: { productId: string; quantity: number } =
          item;

        // tìm sản phẩm dể cộng giá
        const product = await Product.findById(productId);
        if (product) {
          totalAmount += product.price * quantity;

          const newOrderItem = new OrderItem({
            order_id: createdOrder._id, // Liên kết với Order thông qua orderId
            product_id: productId,
            quantity: quantity,
            price: product.price * quantity,
          });

          const createdOrderItem = await newOrderItem.save();
          orderItems.push(createdOrderItem);
        }
      }

      await Order.findByIdAndUpdate(createdOrder._id, {
        total_amount: totalAmount,
      });

      res.status(200).json({ message: "successful", data: orderItems });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async confirmOrder(req: Request, res: Response) {
    try {
      const orderId: string = req.params.orderId;

      // Kiểm tra xem đơn hàng có tồn tại hay không
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      // Xác nhận đơn hàng
      order.order_status = STATUS.dangvanchuyen; // Đặt trạng thái đơn hàng thành "Đang vận chuyển"
      await order.save();

      res.status(200).json({ message: "Order confirmed successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async cancelOrder(req: Request, res: Response) {
    try {
      const orderId = req.params.orderId;

      // Kiểm tra xem đơn hàng có tồn tại không
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Kiểm tra xem đơn hàng đã được hủy hay chưa
      if (order.order_status === STATUS.dahuy) {
        return res.status(400).json({ message: "Order is already cancelled" });
      }

      // Cập nhật trạng thái đơn hàng thành "cancelled"
      order.order_status = STATUS.dahuy;
      await order.save();

      res.status(200).json({ message: "Order cancelled successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new OrderController();
