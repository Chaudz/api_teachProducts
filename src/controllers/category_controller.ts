import { Request, Response } from "express";
import Category, { ICategory } from "../models/category";

class CategoryController {
  async getAllCategories(req: Request, res: Response) {
    try {
      const categoryList = await Category.find();

      res.status(200).json(categoryList);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const categoryName: string = req.body.categoryName;
      if (!categoryName) {
        return res.status(400).json({ message: "Missing required parameters" });
      }

      const newCategory = new Category({ category_name: categoryName });
      newCategory.save();

      res.status(200).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const categoryId: string = req.params.categoryId;

      const deletedCategory: ICategory | null =
        await Category.findByIdAndRemove(categoryId);

      if (!deletedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const categoryId: string = req.params.categoryId;
      const categoryName: string = req.body.categoryName;

      const updatedCategoryData: ICategory = {
        category_name: categoryName,
        updated_at: new Date(),
      };

      const updatedCategory: ICategory | null =
        await Category.findByIdAndUpdate(categoryId, updatedCategoryData, {
          new: true,
        });

      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new CategoryController();
