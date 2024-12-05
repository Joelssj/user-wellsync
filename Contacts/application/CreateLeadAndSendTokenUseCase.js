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
exports.CreateLeadUseCase = void 0;
const Lead_1 = require("../domain/Lead");
const uuid_1 = require("uuid");
class CreateLeadUseCase {
    constructor(leadsRepository, rabbitMQPublisher) {
        this.leadsRepository = leadsRepository;
        this.rabbitMQPublisher = rabbitMQPublisher;
    }
    run({ first_Name, last_Name, correo, phone, notification_preference }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!correo) {
                throw new Error("El campo 'correo' es obligatorio.");
            }
            // Validar el formato del correo electrónico
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(correo)) {
                throw new Error("El correo electrónico no tiene un formato válido.");
            }
            // Validar que el nombre tenga al menos 4 caracteres
            if (first_Name.length < 4) {
                throw new Error("El nombre debe tener al menos 4 caracteres.");
            }
            // Validar que el apellido tenga al menos 4 caracteres
            if (last_Name.length < 4) {
                throw new Error("El apellido debe tener al menos 4 caracteres.");
            }
            // Validar que el teléfono tenga exactamente 10 dígitos
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                throw new Error("El número de teléfono debe tener exactamente 10 dígitos.");
            }
            // Verificar si el correo o el teléfono ya están registrados
            const existingLeadByEmail = yield this.leadsRepository.getByEmail(correo);
            if (existingLeadByEmail) {
                throw new Error("El correo ya está registrado.");
            }
            const existingLeadByPhone = yield this.leadsRepository.getByPhone(phone);
            if (existingLeadByPhone) {
                throw new Error("El número de teléfono ya está registrado.");
            }
            // Verificar que la preferencia de notificación sea válida
            if (!["email", "whatsapp"].includes(notification_preference)) {
                throw new Error("La preferencia de notificación debe ser 'email' o 'whatsapp'.");
            }
            const uuid = (0, uuid_1.v4)();
            const lead = new Lead_1.Lead(uuid, first_Name, last_Name, correo, phone, notification_preference);
            yield this.leadsRepository.saveLead(lead);
            // Publicar el evento en RabbitMQ con la preferencia de notificación
            const event = {
                leadUuid: uuid,
                firstName: first_Name,
                lastName: last_Name,
                correo: correo,
                phone: phone,
                notification_preference: notification_preference
            };
            yield this.rabbitMQPublisher.publish("lead.created", event);
            console.log(`Evento 'lead.created' publicado en RabbitMQ con datos: ${JSON.stringify(event)}`);
            return lead;
        });
    }
}
exports.CreateLeadUseCase = CreateLeadUseCase;
