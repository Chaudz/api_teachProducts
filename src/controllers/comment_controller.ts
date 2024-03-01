import { Request, Response } from "express";
import Comment from "../models/comment";

class ConmmentController {
  async getCommentsByProductId(req: Request, res: Response) {
    const productId = req.params.productId;

    try {
      // Tìm tất cả comment dựa trên productId
      const comments = await Comment.find({ product_id: productId });

      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createComment(req: Request, res: Response) {
    try {
      const {
        userId,
        commentText,
        productId,
      }: { userId: string; commentText: string; productId: string } = req.body;

      if (!userId || !commentText || !productId) {
        return res.status(400).json({ message: "Missing required parameters" });
      }

      const newComment = new Comment({
        comment_text: commentText,
        user_id: userId,
        product_id: productId,
      });
      await newComment.save();

      res.status(200).json(newComment);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new ConmmentController();
