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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgUsersRepository = void 0;
const User_1 = require("../../domain/User");
const pg_1 = require("../../../database/pg/pg");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class PgUsersRepository {
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
            INSERT INTO users (uuid, correo, password, is_active, lead_uuid, notification_preference)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
            const params = [user.uuid, user.correo, user.password, user.isActive, user.leadUuid, user.notificationPreference];
            yield (0, pg_1.query)(sql, params);
        });
    }
    activateUser(userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Ejecutando activación para el usuario con UUID: ${userUuid}`);
            const sql = "UPDATE users SET is_active = true WHERE uuid = $1";
            const params = [userUuid];
            yield (0, pg_1.query)(sql, params);
            console.log(`✔️ Usuario ${userUuid} activado en la base de datos PostgreSQL`);
        });
    }
    getUserByEmail(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM users WHERE correo = $1";
            const params = [correo];
            const result = yield (0, pg_1.query)(sql, params);
            if (!result || !result.rows || result.rows.length === 0)
                return null;
            const user = result.rows[0];
            return new User_1.User(user.uuid, user.correo, user.password, user.is_active, user.lead_uuid, user.notification_preference);
        });
    }
    getByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM users WHERE uuid = $1";
            const params = [uuid];
            const result = yield (0, pg_1.query)(sql, params);
            if (!result || !result.rows || result.rows.length === 0)
                return null;
            const user = result.rows[0];
            return new User_1.User(user.uuid, user.correo, user.password, user.is_active, user.lead_uuid, user.notification_preference);
        });
    }
    login(correo, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM users WHERE correo = $1";
                const params = [correo];
                const result = yield (0, pg_1.query)(sql, params);
                if (!result || !result.rows || result.rows.length === 0)
                    return null;
                const user = result.rows[0];
                if (user && (yield bcrypt_1.default.compare(password, user.password))) {
                    return new User_1.User(user.uuid, user.correo, user.password, user.is_active, user.lead_uuid, user.notification_preference);
                }
                return null;
            }
            catch (error) {
                console.error("Error en login:", error);
                throw new Error("Error en el proceso de login");
            }
        });
    }
    getUserByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM users WHERE uuid = $1";
            const params = [uuid];
            const result = yield (0, pg_1.query)(sql, params);
            if (!result || !result.rows || result.rows.length === 0)
                return null;
            const user = result.rows[0];
            return new User_1.User(user.uuid, user.correo, user.password, user.is_active, user.lead_uuid, user.notification_preference);
        });
    }
    deleteUserByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "DELETE FROM users WHERE uuid = $1";
            const params = [uuid];
            yield (0, pg_1.query)(sql, params);
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
            UPDATE users
            SET correo = $1,
                password = $2,
                is_active = $3,
                notification_preference = $4
            WHERE uuid = $5
        `;
            const params = [user.correo, user.password, user.isActive, user.notificationPreference, user.uuid];
            yield (0, pg_1.query)(sql, params);
        });
    }
    save(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar que las contraseñas coinciden
            if (userData.password !== userData.confirmPassword) {
                throw new Error("Las contraseñas no coinciden.");
            }
            // Generar UUID y encriptar la contraseña
            const uuid = (0, uuid_1.v4)();
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
            // Crear instancia de usuario
            const user = new User_1.User(uuid, userData.correo, hashedPassword, false, null, userData.notificationPreference);
            // Guardar el usuario en la base de datos
            yield this.saveUser(user);
            return user;
        });
    }
    createUserEvent(userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = { userUuid };
            console.log("📤 Evento de usuario publicado:", message);
        });
    }
}
exports.PgUsersRepository = PgUsersRepository;
