"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
const router = (0, express_1.Router)();
router.get("/", user_controller_1.default.index);
router.get("/:id", user_controller_1.default.show);
router.post("/", user_controller_1.default.create);
router.delete("/:id", user_controller_1.default.remove);
router.put("/", user_controller_1.default.update);
exports.default = router;
