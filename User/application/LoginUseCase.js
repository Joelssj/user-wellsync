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
exports.LoginUseCase = void 0;
class LoginUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    run(correo, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.usersRepository.login(correo, password);
                if (user) {
                    return { userUuid: user.uuid, leadUuid: user.leadUuid || '' }; // Devolver ambos UUIDs
                }
                return null;
            }
            catch (error) {
                console.error("Error en el proceso de login:", error);
                return null;
            }
        });
    }
}
exports.LoginUseCase = LoginUseCase;
