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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordController = void 0;
class ResetPasswordController {
    constructor(resetPasswordUseCase) {
        this.resetPasswordUseCase = resetPasswordUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { UserUuid, newPassword, confirmPassword } = req.body;
            try {
                yield this.resetPasswordUseCase.run(UserUuid, newPassword, confirmPassword);
                return res.status(200).json({ message: "Contraseña actualizada correctamente." });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Error desconocido";
                return res.status(400).json({ error: errorMessage });
            }
        });
    }
}
exports.ResetPasswordController = ResetPasswordController;
