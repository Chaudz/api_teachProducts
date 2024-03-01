import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import Role from "../models/role";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AdminController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }

      const roleUser = await Role.findById(user.role_id);
      if (!roleUser) {
        return res.status(404).json({ message: "Không tìm được role" });
      }

      const checkPass = await bcrypt.compare(password, user.password); // xác thực password

      if (!checkPass) {
        return res.status(404).json({ message: "Mật khẩu không khớp" });
      }

      if (roleUser.role == "admin") {
        const token = jwt.sign(
          { email, user_id: user._id, role_id: user.role_id },
          "authen1"
        );

        user.token = token;
        await user.save();
        res.status(200).json({ token: token, userId: user._id });
        return;
      }

      return res
        .status(403)
        .json({ message: "Không đúng vai trò là người dùng" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
    }
  }
}

export default new AdminController();
