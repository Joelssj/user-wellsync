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
exports.CreateUserUseCase = void 0;
const User_1 = require("../domain/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class CreateUserUseCase {
    constructor(usersRepository, leadsRepository, rabbitMQPublisher) {
        this.usersRepository = usersRepository;
        this.leadsRepository = leadsRepository;
        this.rabbitMQPublisher = rabbitMQPublisher;
    }
    run(correo, password, confirmPassword, notificationPreference = 'email' // Valor predeterminado si no se proporciona
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. Verificar que las contraseñas coinciden
            if (password !== confirmPassword) {
                throw new Error("Las contraseñas no coinciden.");
            }
            // 2. Validar que la contraseña cumpla con los requisitos de seguridad
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                throw new Error("La contraseña debe tener al menos 8 caracteres, incluir letras, números y símbolos especiales.");
            }
            // 3. Verificar que el lead existe
            const lead = yield this.leadsRepository.getByEmail(correo);
            if (!lead) {
                throw new Error("Lead no encontrado.");
            }
            // 4. Verificar que el usuario no exista
            const existingUser = yield this.usersRepository.getUserByEmail(correo);
            if (existingUser) {
                throw new Error("El correo ya está registrado.");
            }
            // 5. Encriptar la contraseña antes de guardar
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // 6. Crear el usuario asociado al lead con la preferencia de notificación
            const userUuid = (0, uuid_1.v4)();
            const user = new User_1.User(userUuid, correo, hashedPassword, false, lead.uuid, notificationPreference);
            // 7. Guardar el usuario en la base de datos
            yield this.usersRepository.saveUser(user);
            console.log("Usuario creado exitosamente.");
            // 8. Incluir el número de teléfono y la preferencia de notificación en el evento
            const event = {
                userId: userUuid,
                email: correo,
                notificationPreference,
                phone: lead.phone // Incluir el número de teléfono del lead
            };
            // 9. Publicar el evento de creación del usuario en RabbitMQ
            try {
                yield this.rabbitMQPublisher.publish("user.created", event);
                console.log("Evento 'user.created' publicado en RabbitMQ con los datos:", event);
            }
            catch (error) {
                console.error("Error al publicar el evento de creación del usuario en RabbitMQ:", error);
                throw new Error("No se pudo procesar el evento de creación.");
            }
            // 10. Retornar el usuario creado
            return user;
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
