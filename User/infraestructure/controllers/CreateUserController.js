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
exports.CreateUserController = void 0;
class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, password, confirmPassword, notificationPreference } = req.body;
            try {
                // Verificar que se haya enviado `confirmPassword`
                if (!confirmPassword) {
                    return res.status(400).json({
                        error: "La confirmación de contraseña es obligatoria."
                    });
                }
                // Verificar que se haya enviado `notificationPreference` y que sea válido
                if (!notificationPreference || !['email', 'whatsapp'].includes(notificationPreference)) {
                    return res.status(400).json({
                        error: "La preferencia de notificación es obligatoria y debe ser 'email' o 'whatsapp'."
                    });
                }
                // Ejecuta el caso de uso que crea el usuario
                const user = yield this.createUserUseCase.run(correo, password, confirmPassword, notificationPreference);
                // Devolver la respuesta con los datos del usuario creado
                return res.status(201).json({
                    message: "Usuario creado exitosamente",
                    user: {
                        uuid: user.uuid,
                        correo: user.correo,
                        leadUuid: user.leadUuid,
                        isActive: user.isActive,
                        notificationPreference: user.notificationPreference // Agregado a la respuesta
                    }
                });
            }
            catch (error) {
                // Manejo de errores
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                return res.status(500).json({ error: errorMessage });
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
