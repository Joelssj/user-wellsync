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
exports.UserEventController = void 0;
class UserEventController {
    constructor(createUserEventUseCase) {
        this.createUserEventUseCase = createUserEventUseCase;
    }
    createEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userUuid } = req.body;
            if (!userUuid) {
                return res.status(400).json({ error: "El campo 'userUuid' es obligatorio." });
            }
            try {
                yield this.createUserEventUseCase.execute(userUuid);
                return res.status(201).json({ message: "Evento creado y publicado correctamente." });
            }
            catch (error) {
                console.error("Error al crear el evento:", error);
                return res.status(500).json({ error: "Error al crear el evento." });
            }
        });
    }
}
exports.UserEventController = UserEventController;
