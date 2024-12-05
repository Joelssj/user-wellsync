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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordUseCase = void 0;
// ResetPasswordUseCase.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
class ResetPasswordUseCase {
    constructor(passwordResetRepository, usersRepository) {
        this.passwordResetRepository = passwordResetRepository;
        this.usersRepository = usersRepository;
    }
    run(UserUuid, newPassword, confirmPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newPassword !== confirmPassword) {
                throw new Error("Las contraseñas no coinciden.");
            }
            const user = yield this.usersRepository.getUserByUuid(UserUuid);
            if (!user) {
                throw new Error("Usuario no encontrado.");
            }
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
            user.password = hashedPassword;
            yield this.usersRepository.updateUser(user);
        });
    }
}
exports.ResetPasswordUseCase = ResetPasswordUseCase;
