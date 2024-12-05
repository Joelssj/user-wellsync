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
exports.MySQLPasswordResetRepository = void 0;
const PasswordReset_1 = require("../../domain/PasswordReset");
const pg_1 = require("../../../database/pg/pg");
class MySQLPasswordResetRepository {
    savePasswordReset(passwordReset) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO password_resets (correo, token, created_at, expiration, is_active) VALUES ($1, $2, $3, $4, $5)";
            const params = [passwordReset.correo, passwordReset.token, passwordReset.createdAt, passwordReset.expiresAt, true];
            yield (0, pg_1.query)(sql, params);
        });
    }
    getPasswordResetByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT correo, token, created_at, expiration FROM password_resets WHERE token = $1 AND is_active = TRUE";
            const params = [token];
            const result = yield (0, pg_1.query)(sql, params);
            if (result.rows.length === 0)
                return null;
            const record = result.rows[0];
            // Retornamos el objeto con el correo extraído correctamente
            return new PasswordReset_1.PasswordReset(record.correo, record.token, record.created_at, record.expiration);
        });
    }
    deactivateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "UPDATE password_resets SET is_active = FALSE WHERE token = $1";
            const params = [token];
            yield (0, pg_1.query)(sql, params);
        });
    }
    deletePasswordReset(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "DELETE FROM password_resets WHERE token = $1";
            const params = [token];
            yield (0, pg_1.query)(sql, params);
        });
    }
}
exports.MySQLPasswordResetRepository = MySQLPasswordResetRepository;
