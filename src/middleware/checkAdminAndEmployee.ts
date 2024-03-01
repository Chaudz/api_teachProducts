import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import Role from "../models/role";
import jwt from "jsonwebtoken";

export async function checkAdminAndEmployeeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const tokenString: string | undefined = req.headers.authorization;

    if (!tokenString) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let verifyObj: any;

    try {
      verifyObj = jwt.verify(tokenString, "authen1");
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (!verifyObj) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(verifyObj.user_id);
    const roleUser = await Role.findById(verifyObj.role_id);
    if ((user && roleUser?.role === "admin") || roleUser?.role === "employee") {
      next();
    } else {
      res.status(403).json({ message: "Not an admin account" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
