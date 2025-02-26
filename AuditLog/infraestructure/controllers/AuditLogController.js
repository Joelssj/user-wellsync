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
exports.AuditLogController = void 0;
class AuditLogController {
    constructor(createAuditLogUseCase) {
        this.createAuditLogUseCase = createAuditLogUseCase;
    }
    logAction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, actionType, details } = req.body;
            try {
                yield this.createAuditLogUseCase.execute(userId, actionType, details);
                res.status(201).json({ message: "Registro de auditoría creado con éxito" });
            }
            catch (error) {
                console.error("Error en el registro de auditoría:", error);
                res.status(500).json({ message: "Error en el servidor al crear el registro de auditoría" });
            }
        });
    }
}
exports.AuditLogController = AuditLogController;
