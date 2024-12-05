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
exports.PublishUserCreatedEventUseCase = void 0;
const UserCreatedEvent_1 = require("../domain/events/UserCreatedEvent");
class PublishUserCreatedEventUseCase {
    constructor(userRepository, publisher, leadsRepository) {
        this.userRepository = userRepository;
        this.publisher = publisher;
        this.leadsRepository = leadsRepository;
    }
    execute(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Guardar el usuario en el repositorio
            const user = yield this.userRepository.save(userData);
            // Extraer el número de teléfono del lead utilizando el leadUuid
            const leadData = yield this.leadsRepository.getLeadByUuid(userData.leadUuid);
            if (!leadData || !leadData.phone) {
                throw new Error('Número de teléfono no encontrado para el lead');
            }
            // Crear el evento incluyendo el número de teléfono
            const event = new UserCreatedEvent_1.UserCreatedEvent(user.uuid, user.correo, userData.leadUuid, leadData.phone);
            // Publicar el evento
            console.log(`📤 Publicando evento user.created con los siguientes datos:`);
            console.log(`- UUID de usuario: ${user.uuid}`);
            console.log(`- Correo: ${user.correo}`);
            console.log(`- UUID de lead: ${userData.leadUuid}`);
            console.log(`- Teléfono: ${leadData.phone}`); // Asegúrate de ver el número de teléfono aquí
            yield this.publisher.publish('user.created', event);
            console.log(`Evento user.created publicado en RabbitMQ con datos: ${JSON.stringify(event)}`);
            return user;
        });
    }
}
exports.PublishUserCreatedEventUseCase = PublishUserCreatedEventUseCase;
