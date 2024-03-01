import { Request, Response } from "express";
import Specification from "../models/specification";

class SpecificationController {
  async getSpecificationByProductId(req: Request, res: Response) {
    try {
      const productId = req.params.productId;

      const specifications = await Specification.find({
        product_id: productId,
      });

      res.status(200).json(specifications);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createSpecification(req: Request, res: Response) {
    try {
      const { productId, name, value } = req.body;
      const checkSpecification = await Specification.findOne({
        product_id: productId,
        specification_name: name,
      });
      if (checkSpecification) {
        return res.status(409).json("Specification already exists"); // mâu thuẫn
      }

      const newSpecification = new Specification({
        specification_name: name,
        specification_value: value,
        product_id: productId,
      });
      newSpecification.save();

      res.status(200).json(newSpecification);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async removeSpecification(req: Request, res: Response) {
    try {
      const { name, productId } = req.body;

      const result = await Specification.findOneAndDelete({
        product_id: productId,
        specification_name: name,
      });
      if (result) {
        res.status(200).json({ message: "Specification removed successfully" });
      } else {
        res.status(404).json({ message: "Specification not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new SpecificationController();
