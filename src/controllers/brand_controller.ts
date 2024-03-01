import { Request, Response } from "express";
import Brand from "../models/brand";

class BrandController {
  async getAllBrands(req: Request, res: Response) {
    try {
      const brands = await Brand.find();
      console.log(brands);
      res.status(200).json(brands);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createBrand(req: Request, res: Response) {
    try {
      const brandName = req.body.brandName;
      console.log(brandName);
      const newBrand = new Brand({ brand_name: brandName });
      await newBrand.save();

      res.status(200).json(newBrand);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async removeBrand(req: Request, res: Response) {
    try {
      const brandId = req.params.brandId;

      await Brand.findByIdAndDelete(brandId);

      res.status(200).json({ message: "brand was removed successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new BrandController();
