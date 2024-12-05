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
exports.ValidateTokenUseCase = void 0;
class ValidateTokenUseCase {
    constructor(passwordResetRepository, usersRepository) {
        this.passwordResetRepository = passwordResetRepository;
        this.usersRepository = usersRepository;
    }
    run(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordReset = yield this.passwordResetRepository.getPasswordResetByToken(token);
            if (!passwordReset) {
                throw new Error("Token inválido o expirado.");
            }
            const user = yield this.usersRepository.getUserByEmail(passwordReset.correo);
            if (!user) {
                throw new Error("Usuario no encontrado.");
            }
            // Retornar el identificador único del usuario
            return user.uuid;
        });
    }
}
exports.ValidateTokenUseCase = ValidateTokenUseCase;
