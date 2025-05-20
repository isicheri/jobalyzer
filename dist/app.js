"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const App = (0, express_1.default)();
App.use((0, helmet_1.default)());
App.set("view engine", "ejs");
App.use(express_1.default.static(path_1.default.join(process.cwd(), "public")));
App.get("/", (req, res) => {
    // res.sendFile()
});
exports.default = App;
