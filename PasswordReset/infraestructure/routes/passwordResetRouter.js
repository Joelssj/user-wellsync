"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetRouter = void 0;
// passwordResetRouter.ts
const express_1 = require("express");
const dependencies_1 = require("../dependencies/dependencies");
const router = (0, express_1.Router)();
exports.passwordResetRouter = router;
// Ruta para solicitar la recuperación de la contraseña
router.post("/password-reset", (req, res) => dependencies_1.createPasswordResetController.run(req, res));
// Ruta para validar el token y obtener el UserUuid
router.post("/validate-token", (req, res) => dependencies_1.validateTokenController.run(req, res));
// Ruta para restablecer la contraseña usando el UserUuid
router.post("/reset-password", (req, res) => dependencies_1.resetPasswordController.run(req, res));
