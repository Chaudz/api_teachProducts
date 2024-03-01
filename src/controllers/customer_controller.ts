import { Request, Response } from "express";
import User from "../models/user";
import Role from "../models/role";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
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

      if (
        roleUser.role === "customer" ||
        roleUser.role === "employee" ||
        roleUser.role === "admin"
      ) {
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

  async register(req: Request, res: Response) {
    try {
      const {
        email,
        phone,
        password,
      }: { email: string; phone: number; password: string } = req.body;

      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email: email,
        password: hashedPassword,
        phone: phone,
      });
      newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new UserController();
