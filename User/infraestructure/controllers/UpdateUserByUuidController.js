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
exports.UpdateUserByUuidController = void 0;
class UpdateUserByUuidController {
    constructor(updateUserByUuidUseCase) {
        this.updateUserByUuidUseCase = updateUserByUuidUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, currentPassword, password, confirmPassword } = req.body;
            const { uuid } = req.params;
            // Validar que `uuid`, `correo`, `currentPassword`, `password`, y `confirmPassword` se hayan enviado
            if (!uuid || !correo || !currentPassword || !password || !confirmPassword) {
                return res.status(400).json({
                    error: "Los campos 'uuid', 'correo', 'currentPassword', 'password', y 'confirmPassword' son obligatorios."
                });
            }
            try {
                // Ejecutar el caso de uso con solo los campos necesarios
                yield this.updateUserByUuidUseCase.run(uuid, correo, currentPassword, // Contraseña actual para validación
                password, confirmPassword // Confirmación de la nueva contraseña
                );
                return res.status(200).json({ message: "Usuario actualizado correctamente" });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                return res.status(404).json({ error: errorMessage });
            }
        });
    }
}
exports.UpdateUserByUuidController = UpdateUserByUuidController;
