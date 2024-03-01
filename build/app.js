"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./router/index"));
const body_parser_1 = __importDefault(require("body-parser"));
const connect_db_1 = require("./config/connect_db");
const app = (0, express_1.default)();
// connect db
(0, connect_db_1.connect)();
// create application/json parser
app.use(body_parser_1.default.json());
// create application/x-www-form-urlencoded parser
app.use(body_parser_1.default.urlencoded({ extended: false }));
//config router
app.use("/users", index_1.default);
app.listen(3000, () => {
    console.log("server is running http://localhost:3000/");
});
