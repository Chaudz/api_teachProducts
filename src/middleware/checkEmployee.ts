import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import Role from "../models/role";
import jwt from "jsonwebtoken";

export async function checkCustomerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const tokenstring: any = req.headers.authorization;

    const verifyObj: any = await jwt.verify(tokenstring, "authen1");
    if (!verifyObj) {
      return res.sendStatus(401);
    }

    const user = await User.findById(verifyObj.user_id);
    const roleUser = await Role.findById(verifyObj.role_id);
    if (roleUser?.role === "employee") {
      next();
      return;
    }

    res.status(403).json({ message: "Không phải tài khoản  nhân viên" });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
  }
}
