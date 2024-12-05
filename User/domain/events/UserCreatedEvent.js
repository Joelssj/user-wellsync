"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreatedEvent = void 0;
class UserCreatedEvent {
    constructor(userUuid, correo, leadUuid, phone) {
        this.userUuid = userUuid;
        this.correo = correo;
        this.leadUuid = leadUuid;
        this.phone = phone;
    }
}
exports.UserCreatedEvent = UserCreatedEvent;
