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
exports.GetProfilePictureByUserUuidController = void 0;
class GetProfilePictureByUserUuidController {
    constructor(getProfilePictureByUserUuidUseCase) {
        this.getProfilePictureByUserUuidUseCase = getProfilePictureByUserUuidUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userUuid } = req.params;
            try {
                const profilePicture = yield this.getProfilePictureByUserUuidUseCase.run(userUuid);
                if (!profilePicture) {
                    return res.status(404).json({ error: "Foto de perfil no encontrada para el usuario." });
                }
                // Verificar si `profilePicture` es un objeto con `url`
                const url = typeof profilePicture === 'object' && 'url' in profilePicture ? profilePicture.url : null;
                if (!url) {
                    return res.status(500).json({ error: "URL de la foto de perfil no encontrado." });
                }
                return res.status(200).json({ url });
            }
            catch (error) {
                console.error("Error al obtener la foto de perfil:", error);
                return res.status(500).json({ error: "Error al obtener la foto de perfil." });
            }
        });
    }
}
exports.GetProfilePictureByUserUuidController = GetProfilePictureByUserUuidController;

