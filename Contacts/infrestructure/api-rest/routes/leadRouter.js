"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("../dependencies/dependencies");
exports.leadRouter = express_1.default.Router();
exports.leadRouter.post("/create", dependencies_1.createLeadController.run.bind(dependencies_1.createLeadController));
exports.leadRouter.get("/get/:uuid", (req, res) => dependencies_1.getLeadByUuidController.run(req, res));
exports.leadRouter.delete("/:uuid", (req, res) => dependencies_1.deleteLeadByUuidController.run(req, res));
exports.leadRouter.put("/update/:uuid", (req, res) => dependencies_1.updateLeadController.run(req, res));
exports.leadRouter.get("/getall", (req, res) => dependencies_1.getAllLeadsController.run(req, res));
