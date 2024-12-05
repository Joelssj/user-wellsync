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
exports.UpdateLeadUseCase = void 0;
const Lead_1 = require("../domain/Lead");
class UpdateLeadUseCase {
    constructor(leadsRepository, rabbitMQPublisher) {
        this.leadsRepository = leadsRepository;
        this.rabbitMQPublisher = rabbitMQPublisher;
    }
    run({ uuid, first_Name, last_Name, email, phone, notificationPreference = null }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uuid) {
                throw new Error("El campo 'uuid' es obligatorio para actualizar un Lead.");
            }
            const existingLead = yield this.leadsRepository.getLeadByUuid(uuid);
            if (!existingLead) {
                throw new Error(`No se encontró un Lead con UUID: ${uuid}`);
            }
            // Si notificationPreference es nulo, utiliza el valor actual del Lead existente
            const updatedNotificationPreference = notificationPreference !== null ? notificationPreference : existingLead.notificationPreference;
            const updatedLead = new Lead_1.Lead(uuid, first_Name, last_Name, email, phone, updatedNotificationPreference);
            yield this.leadsRepository.updateLead(updatedLead);
            if (this.rabbitMQPublisher) {
                const event = {
                    leadUuid: uuid,
                    firstName: first_Name,
                    lastName: last_Name,
                    email: email,
                    notificationPreference: updatedNotificationPreference // Incluye la preferencia de notificación en el evento
                };
                yield this.rabbitMQPublisher.publish("lead.updated", event);
                console.log(`Evento 'lead.updated' publicado en RabbitMQ con datos: ${JSON.stringify(event)}`);
            }
            return updatedLead;
        });
    }
}
exports.UpdateLeadUseCase = UpdateLeadUseCase;
