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
exports.UpdateLeadController = void 0;
class UpdateLeadController {
    constructor(updateLeadUseCase) {
        this.updateLeadUseCase = updateLeadUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid } = req.params;
            const { first_Name, last_Name, email, phone, notificationPreference } = req.body;
            if (!uuid) {
                return res.status(400).json({ error: "El campo 'uuid' es obligatorio." });
            }
            try {
                const updatedLead = yield this.updateLeadUseCase.run({
                    uuid,
                    first_Name,
                    last_Name,
                    email,
                    phone,
                    notificationPreference: notificationPreference || null // Pasamos null si no está definido
                });
                return res.status(200).json({
                    message: "Lead actualizado exitosamente",
                    lead: updatedLead
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Error desconocido";
                return res.status(500).json({ error: errorMessage });
            }
        });
    }
}
exports.UpdateLeadController = UpdateLeadController;
