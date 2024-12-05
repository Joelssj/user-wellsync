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
exports.PgProfilePictureRepository = void 0;
const ProfilePicture_1 = require("../../domain/ProfilePicture");
const pg_1 = require("../../../database/pg/pg"); // Usamos la misma conexión de pg
const uuid_1 = require("uuid");
class PgProfilePictureRepository {
    save(profilePicture) {
        return __awaiter(this, void 0, void 0, function* () {
            // Primero verificamos si ya existe una imagen para el usuario
            const existingProfilePicture = yield this.getByUserUuid(profilePicture.userUuid);
            if (existingProfilePicture) {
                // Si ya existe, actualizamos la URL y la fecha de creación
                const sql = `
                UPDATE profile_pictures
                SET url = $1, created_at = $2
                WHERE user_uuid = $3
            `;
                const params = [profilePicture.url, new Date(), profilePicture.userUuid];
                yield (0, pg_1.query)(sql, params);
            }
            else {
                // Si no existe, insertamos una nueva imagen
                const sql = `
                INSERT INTO profile_pictures (id, user_uuid, url, created_at)
                VALUES ($1, $2, $3, $4)
            `;
                const params = [
                    profilePicture.id || (0, uuid_1.v4)(),
                    profilePicture.userUuid,
                    profilePicture.url,
                    profilePicture.createdAt || new Date()
                ];
                yield (0, pg_1.query)(sql, params);
            }
        });
    }
    getByUserUuid(userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
            SELECT * FROM profile_pictures WHERE user_uuid = $1 LIMIT 1
        `;
            const params = [userUuid];
            const result = yield (0, pg_1.query)(sql, params);
            if (!result || !result.rows || result.rows.length === 0)
                return null;
            const row = result.rows[0];
            return new ProfilePicture_1.ProfilePicture(row.id, row.user_uuid, row.url, row.created_at);
        });
    }
    delete(profilePictureId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
            DELETE FROM profile_pictures WHERE id = $1
        `;
            const params = [profilePictureId];
            yield (0, pg_1.query)(sql, params);
        });
    }
    getByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT url FROM profile_pictures WHERE id = $1 LIMIT 1`; // Seleccionamos solo el campo url
            const params = [uuid];
            const result = yield (0, pg_1.query)(sql, params);
            if (!result || !result.rows || result.rows.length === 0)
                return null;
            const row = result.rows[0];
            return row.url; // Retornamos solo la URL en lugar de un objeto completo
        });
    }
}
exports.PgProfilePictureRepository = PgProfilePictureRepository;
