"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePicture = void 0;
const uuid_1 = require("uuid");
class ProfilePicture {
    constructor(id = (0, uuid_1.v4)(), // Genera un UUID único para la imagen
    userUuid, // Referencia al UUID del usuario
    url, // URL de la imagen en S3
    createdAt = new Date() // Fecha de creación
    ) {
        this.id = id;
        this.userUuid = userUuid;
        this.url = url;
        this.createdAt = createdAt;
    }
}
exports.ProfilePicture = ProfilePicture;
