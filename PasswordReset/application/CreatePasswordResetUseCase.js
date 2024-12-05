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
exports.CreatePasswordResetUseCase = void 0;
class CreatePasswordResetUseCase {
    constructor(passwordResetRepository, usersRepository, leadsRepository, rabbitMQPublisher) {
        this.passwordResetRepository = passwordResetRepository;
        this.usersRepository = usersRepository;
        this.leadsRepository = leadsRepository;
        this.rabbitMQPublisher = rabbitMQPublisher;
    }
    run(email, notificationPreference) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar si el usuario existe en la base de datos
            const user = yield this.usersRepository.getUserByEmail(email);
            if (!user) {
                throw new Error("No se encontró ningún usuario con ese correo.");
            }
            // Sobrescribir la preferencia de notificación del usuario si se proporciona en la solicitud
            const userNotificationPreference = notificationPreference || user.notificationPreference;
            console.log(`Preferencia de notificación para ${email}: ${userNotificationPreference}`);
            // Generar un token de 4 dígitos
            const token = Math.floor(1000 + Math.random() * 9000).toString();
            const expiresAt = new Date(Date.now() + 3600000); // 1 hora
            // Guardar el token en el repositorio de reseteo de contraseña
            yield this.passwordResetRepository.savePasswordReset({
                correo: email,
                token,
                createdAt: new Date(),
                expiresAt
            });
            // Obtener el número de teléfono del Lead solo si la preferencia es WhatsApp
            let phone;
            if (userNotificationPreference === 'whatsapp') {
                const lead = yield this.leadsRepository.getByEmail(email);
                if (!lead || !lead.phone) {
                    throw new Error("No se encontró un número de teléfono para el usuario.");
                }
                phone = lead.phone;
                console.log(`Número de teléfono para ${email}: ${phone}`);
            }
            // Crear el mensaje a enviar a RabbitMQ
            const message = {
                email,
                token,
                subject: "Recuperación de contraseña",
                body: `Tu código de verificación es: ${token}. Este código expirará en 1 hora.`,
                phone, // Incluye el número de teléfono si es necesario
                notificationPreference: userNotificationPreference
            };
            // Publicar el mensaje en RabbitMQ
            yield this.rabbitMQPublisher.publish("password_reset_notifications", message);
            console.log(`Token de recuperación enviado a través de ${userNotificationPreference} para ${email}.`);
        });
    }
}
exports.CreatePasswordResetUseCase = CreatePasswordResetUseCase;
