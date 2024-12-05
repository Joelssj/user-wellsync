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
exports.CreateAuditLogUseCase = void 0;
// src/AuditLog/application/CreateAuditLogUseCase.ts
const uuid_1 = require("uuid"); // Asegúrate de tener esta librería importada
const AuditLog_1 = require("../domain/AuditLog");
class CreateAuditLogUseCase {
    constructor(auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }
    execute(userId, actionType, details) {
        return __awaiter(this, void 0, void 0, function* () {
            const auditLog = new AuditLog_1.AuditLog((0, uuid_1.v4)(), // Genera un UUID válido
            userId, actionType, details, new Date());
            yield this.auditLogRepository.save(auditLog);
            console.log("Audit Log guardado exitosamente en la base de datos.");
        });
    }
}
exports.CreateAuditLogUseCase = CreateAuditLogUseCase;
