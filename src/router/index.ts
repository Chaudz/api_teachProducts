import { Router } from "express";
import productController from "../controllers/product_controller";
import categoryController from "../controllers/category_controller";
import orderController from "../controllers/order-controller";
import brandController from "../controllers/brand_controller";
import billController from "../controllers/bill_controller";
import specificationController from "../controllers/specification_controller";
import commentController from "../controllers/comment_controller";
import { checkAdminMiddleware } from "../middleware/checkAdmin";
import { checkCustomerMiddleware } from "../middleware/checkCustomer";
import { checkAdminAndEmployeeMiddleware } from "../middleware/checkAdminAndEmployee";

const router = Router();

//product
router.get("/getAllProducts", productController.getAllProducts);
router.get("/getProductById/:productId", productController.getProductById);
router.post(
  "/createProduct",
  checkAdminMiddleware,
  productController.createProduct
);
router.put(
  "/updateProduct/:productId",
  checkAdminMiddleware,
  productController.updateProduct
);
router.delete(
  "/deleteProduct/:productId",
  checkAdminMiddleware,
  productController.deleteProduct
);
router.get("/searchProducts", productController.searchProducts);

// category
router.get("/getAllCategories", categoryController.getAllCategories);
router.post(
  "/createCategory",
  checkAdminMiddleware,
  categoryController.createCategory
);
router.delete(
  "/deleteCategory/:categoryId",
  checkAdminMiddleware,
  categoryController.deleteCategory
);
router.put(
  "/updateCategory/:categoryId",
  checkAdminMiddleware,
  categoryController.updateCategory
);

// order
router.post("/createOrder", orderController.createOrder);
router.post(
  "/confirmOrder/:orderId",
  checkAdminAndEmployeeMiddleware,
  orderController.confirmOrder
);
router.delete(
  "/cancelOrder/:orderId",
  checkAdminAndEmployeeMiddleware,
  orderController.cancelOrder
);

// comment
router.post(
  "/comment",
  checkCustomerMiddleware,
  commentController.createComment
);
router.get(
  "/getCommentByProduct/:productId",
  commentController.getCommentsByProductId
);

// cart
router.post(
  "/addProductCart",
  checkCustomerMiddleware,
  productController.addProductToCart
);
router.delete(
  "/removeProductCart/:cartId",
  checkCustomerMiddleware,
  productController.removeProductFromCart
);

// order
router.post(
  "/createOrder",
  checkCustomerMiddleware,
  orderController.createOrder
);
router.post(
  "/confirmOrder/:orderId",
  checkAdminAndEmployeeMiddleware,
  orderController.confirmOrder
);
router.delete(
  "/cancelOrder/:orderId",
  checkAdminAndEmployeeMiddleware,
  orderController.cancelOrder
);

// brand
router.get("/getAllBrands", brandController.getAllBrands);
router.post("/createBrand", checkAdminMiddleware, brandController.createBrand);
router.delete(
  "/removeBrand/:brandId",
  checkAdminMiddleware,
  brandController.removeBrand
);

// specification
router.get(
  "/getAllSpecificationByProduct/:productId",
  specificationController.getSpecificationByProductId
);
router.post(
  "/createSpecification",
  checkAdminMiddleware,
  specificationController.createSpecification
);
router.delete(
  "/removeSpecification",
  checkAdminMiddleware,
  specificationController.removeSpecification
);

//bill
router.get(
  "/getBill/:orderId",
  checkAdminAndEmployeeMiddleware,
  billController.getBillByOrderId
);
router.post(
  "/createBill",
  checkAdminAndEmployeeMiddleware,
  billController.createBill
);
router.delete(
  "/removeBill",
  checkAdminAndEmployeeMiddleware,
  billController.removeBill
);

export default router;
