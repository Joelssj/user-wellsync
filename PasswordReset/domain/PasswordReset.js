"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordReset = void 0;
class PasswordReset {
    constructor(correo, token, createdAt, expiresAt) {
        this.correo = correo;
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
    }
}
exports.PasswordReset = PasswordReset;
