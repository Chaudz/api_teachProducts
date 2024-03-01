import { Request, Response } from "express";
import Product, { IProduct } from "../models/product";
import Cart, { ICart } from "../models/cart";

class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products: (typeof Product)[] = await Product.find();

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const productId: string = req.params.productId;

      const product: IProduct | null = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const createData: IProduct = req.body;

      const newProduct = new Product(createData);

      const createdProduct = await newProduct.save();

      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const productId: string = req.params.productId;
      const updatedProductData: IProduct = {
        ...req.body,
        updated_at: new Date(),
      };

      const updatedProduct: IProduct | null = await Product.findByIdAndUpdate(
        productId,
        updatedProductData,
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const productId: string = req.params.productId;

      const deletedProduct: IProduct | null = await Product.findByIdAndRemove(
        productId
      );

      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async searchProducts(req: Request, res: Response) {
    try {
      const keyword: string = req.query.keyword?.toString() || "";

      if (keyword.length < 1) {
        return res
          .status(400)
          .json({ error: "Search keyword should have at least one character" });
      }

      const products: IProduct[] = await Product.find({
        $or: [
          { product_name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      });

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async addProductToCart(req: Request, res: Response) {
    try {
      const { userId, productId }: { userId: string; productId: string } =
        req.body;
      if (!userId || !productId) {
        return res.status(400).json({ message: "Missing required parameters" });
      }

      const cartItem = await Cart.findOne({
        user_id: userId,
        product_id: productId,
      });
      if (!cartItem) {
        const newItem = new Cart({
          quantity: 1,
          user_id: userId,
          product_id: productId,
        });
        await newItem.save();
        res.status(200).json(newItem);
      } else {
        cartItem.quantity += 1;
        cartItem.save();
        res.status(200).json(cartItem);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async removeProductFromCart(req: Request, res: Response) {
    try {
      const cartId: string = req.params.cartId;

      if (!cartId) {
        return res
          .status(400)
          .json({ message: "Missing required parameter: cartId" });
      }

      const cartItem = await Cart.findByIdAndDelete(cartId);
      if (!cartItem) {
        return res.status(404).json({ message: "CartItem not found" });
      }

      res.status(200).json({ message: "CartItem removed successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new ProductController();
