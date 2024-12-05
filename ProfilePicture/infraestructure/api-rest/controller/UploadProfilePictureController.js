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
exports.UploadProfilePictureController = void 0;
class UploadProfilePictureController {
    constructor(uploadProfilePictureUseCase) {
        this.uploadProfilePictureUseCase = uploadProfilePictureUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userUuid } = req.params;
            console.log("UUID del usuario recibido en el controlador:", userUuid); // Verificar el UUID recibido
            if (!userUuid) {
                return res.status(400).json({ error: "El UUID del usuario es obligatorio en la URL." });
            }
            if (!req.file) {
                return res.status(400).json({ error: "No se subió ningún archivo." });
            }
            try {
                const fileBuffer = req.file.buffer;
                console.log("Archivo recibido en el controlador. Iniciando carga...");
                const profilePicture = yield this.uploadProfilePictureUseCase.run(fileBuffer, userUuid);
                console.log("Foto de perfil subida exitosamente:", profilePicture);
                return res.status(200).json({
                    message: "Foto de perfil subida exitosamente",
                    profilePicture
                });
            }
            catch (error) {
                console.error("Error al subir la foto de perfil:", error);
                return res.status(500).json({ error: "Error al subir la foto de perfil." });
            }
        });
    }
}
exports.UploadProfilePictureController = UploadProfilePictureController;
