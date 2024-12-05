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
exports.CreateLeadController = void 0;
class CreateLeadController {
    constructor(createLeadUseCase) {
        this.createLeadUseCase = createLeadUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { first_Name, last_Name, correo, phone, notification_preference } = req.body;
            try {
                const lead = yield this.createLeadUseCase.run({
                    first_Name,
                    last_Name,
                    correo,
                    phone,
                    notification_preference // Pasamos la preferencia de notificación al caso de uso
                });
                return res.status(201).json({ message: 'Lead creado exitosamente', lead });
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CreateLeadController = CreateLeadController;
