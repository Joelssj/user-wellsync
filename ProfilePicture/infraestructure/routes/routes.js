"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilePictureRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const dependencies_1 = require("../dependencies/dependencies");
const router = (0, express_1.Router)();
exports.profilePictureRouter = router;
const upload = (0, multer_1.default)(); // Configura multer para manejar el archivo en la solicitud
// Ruta para subir la foto de perfil
router.post("/picture/:userUuid", upload.single("profilePicture"), (req, res) => {
    dependencies_1.uploadProfilePictureController.run(req, res);
});
// Ruta para obtener la foto de perfil
router.get("/get/:userUuid", (req, res) => {
    dependencies_1.getProfilePictureByUserUuidController.run(req, res);
});
