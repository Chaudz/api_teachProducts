import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

class IndexController {
  async logout(req: Request, res: Response) {
    try {
      let tokenstring: any = req.headers.authorization;
      let verifyObj: any = await jwt.verify(tokenstring, "authen1");
      if (!verifyObj) {
        return res.status(401).json({ message: "Chua dang nhap" });
      }

      let user = await User.findById(verifyObj.user_id);
      if (!user || user.token != tokenstring) {
        return res.status(401).json({ message: "Chua dang nhap" });
      }

      user.token = "";
      await user.save();
      res.status(200).json({ message: "successful logout" });
    } catch (err) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
    }
  }
}

export default new IndexController();
