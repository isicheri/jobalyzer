"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const ratelimiter_1 = __importDefault(require("./config/ratelimiter/ratelimiter"));
const App = (0, express_1.default)();
App.use((0, helmet_1.default)());
App.use(ratelimiter_1.default);
App.use(express_1.default.urlencoded({ extended: true }));
App.set("view engine", "ejs");
App.use(express_1.default.static(path_1.default.join(process.cwd(), "public")));
App.get("/", (req, res) => {
    res.sendFile("index.html");
});
exports.default = App;
