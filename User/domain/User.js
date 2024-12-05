"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(uuid, correo, password, isActive, leadUuid, // Permitir que sea `null`
    notificationPreference // Preferencia de notificación
    ) {
        this.uuid = uuid;
        this.correo = correo;
        this.password = password;
        this.isActive = isActive;
        this.leadUuid = leadUuid;
        this.notificationPreference = notificationPreference;
    }
}
exports.User = User;
