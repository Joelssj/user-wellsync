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
exports.UploadProfilePictureUseCase = void 0;
const ProfilePicture_1 = require("../domain/ProfilePicture");
class UploadProfilePictureUseCase {
    constructor(profilePictureRepository, s3Service) {
        this.profilePictureRepository = profilePictureRepository;
        this.s3Service = s3Service;
    }
    run(fileBuffer, userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Iniciando la subida de la foto de perfil para el usuario con UUID:", userUuid);
            // Subir la foto a S3 y obtener la URL
            const profilePictureUrl = yield this.s3Service.uploadProfilePicture(fileBuffer, userUuid);
            console.log("URL de la foto de perfil obtenida de S3:", profilePictureUrl);
            // Crear una nueva instancia de ProfilePicture
            const profilePicture = new ProfilePicture_1.ProfilePicture(undefined, userUuid, profilePictureUrl);
            console.log("Objeto ProfilePicture creado:", profilePicture);
            // Guardar la URL de la foto en la base de datos
            yield this.profilePictureRepository.save(profilePicture);
            console.log("Foto de perfil guardada en la base de datos.");
            return profilePicture;
        });
    }
}
exports.UploadProfilePictureUseCase = UploadProfilePictureUseCase;
