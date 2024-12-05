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
exports.UpdateUserByUuidUseCase = void 0;
const User_1 = require("../domain/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UpdateUserByUuidUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    run(uuid, correo, currentPassword, // Contraseña actual proporcionada por el usuario
    password, confirmPassword, isActive = null, // Opcional, por defecto nulo
    notificationPreference = null // Opcional, por defecto nulo
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            // Obtener el usuario por UUID
            const user = yield this.usersRepository.getUserByUuid(uuid);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            // Validar la contraseña actual
            const isCurrentPasswordValid = yield bcrypt_1.default.compare(currentPassword, user.password);
            if (!isCurrentPasswordValid) {
                throw new Error("La contraseña actual no es correcta.");
            }
            // Validar que la nueva contraseña y la confirmación coincidan
            if (password !== confirmPassword) {
                throw new Error("Las nuevas contraseñas no coinciden.");
            }
            // Encriptar la nueva contraseña
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Usar la preferencia de notificación y estado activo actuales si no se proporcionan valores nuevos
            const finalNotificationPreference = notificationPreference !== null && notificationPreference !== void 0 ? notificationPreference : user.notificationPreference;
            const finalIsActive = isActive !== null && isActive !== void 0 ? isActive : user.isActive;
            // Actualizar la información del usuario
            const updatedUser = new User_1.User(user.uuid, correo, hashedPassword, finalIsActive, user.leadUuid, finalNotificationPreference);
            yield this.usersRepository.updateUser(updatedUser);
        });
    }
}
exports.UpdateUserByUuidUseCase = UpdateUserByUuidUseCase;
