"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
class UserController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.find({});
                res.status(200).json({ users: users });
            }
            catch (err) {
                res.status(500).json({ message: "Err" });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const user = yield user_1.default.findById(id);
                res.status(200).json({ user: user });
            }
            catch (err) {
                res.status(500).json({ message: "Err" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let usernew = new user_1.default({ name: req.body.name, email: req.body.email });
                usernew.save();
                res.status(200).json({ usernew });
            }
            catch (err) {
                res.status(500).json({ message: "Err" });
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield user_1.default.findByIdAndDelete({ _id: req.params.id });
                res.status(200).json({ user: user });
            }
            catch (error) {
                res.status(500).json({ message: "Err" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.body.id;
                let name = req.body.name;
                let email = req.body.email;
                let user = yield user_1.default.findByIdAndUpdate(id, { name: name, email: email });
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: "Err" });
            }
        });
    }
}
exports.default = new UserController();
