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
exports.PgLeadsRepository = void 0;
const Lead_1 = require("../../domain/Lead");
const pg_1 = require("../../../database/pg/pg");
class PgLeadsRepository {
    saveLead(lead) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
            INSERT INTO leads (uuid, first_name, last_name, correo, phone, notification_preference)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
            const params = [lead.uuid, lead.first_Name, lead.last_Name, lead.correo, lead.phone, lead.notificationPreference];
            yield (0, pg_1.query)(sql, params);
        });
    }
    getLeadByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM leads WHERE uuid = $1";
            const params = [uuid];
            const result = yield (0, pg_1.query)(sql, params);
            if (!result || !result.rows || result.rows.length === 0)
                return null;
            const lead = result.rows[0];
            return new Lead_1.Lead(lead.uuid, lead.first_name, lead.last_name, lead.correo, lead.phone, lead.notification_preference);
        });
    }
    deleteLeadByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "DELETE FROM leads WHERE uuid = $1";
            const params = [uuid];
            yield (0, pg_1.query)(sql, params);
        });
    }
    getByEmail(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM leads WHERE correo = $1";
            const params = [correo];
            const result = yield (0, pg_1.query)(sql, params);
            if (!result || !result.rows || result.rows.length === 0)
                return null;
            const lead = result.rows[0];
            return new Lead_1.Lead(lead.uuid, lead.first_name, lead.last_name, lead.correo, lead.phone, lead.notification_preference);
        });
    }
    getByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM leads WHERE phone = $1";
            const params = [phone];
            const result = yield (0, pg_1.query)(sql, params);
            if (!result || !result.rows || result.rows.length === 0)
                return null;
            const lead = result.rows[0];
            return new Lead_1.Lead(lead.uuid, lead.first_name, lead.last_name, lead.correo, lead.phone, lead.notification_preference);
        });
    }
    updateLead(lead) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
            UPDATE leads
            SET first_name = $1,
                last_name = $2,
                correo = $3,
                phone = $4,
                notification_preference = $5
            WHERE uuid = $6
        `;
            const params = [
                lead.first_Name,
                lead.last_Name,
                lead.correo,
                lead.phone,
                lead.notificationPreference,
                lead.uuid
            ];
            yield (0, pg_1.query)(sql, params);
            console.log(`✅ Lead actualizado en PostgreSQL con UUID: ${lead.uuid}`);
        });
    }
    getAllLeads() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM leads";
            const params = []; // Especificamos un arreglo vacío si no hay parámetros
            const result = yield (0, pg_1.query)(sql, params);
            // Verificamos si `result` es `null` o no tiene filas
            if (!result || !result.rows) {
                return []; // Retorna un arreglo vacío si no hay resultados
            }
            return result.rows.map((row) => new Lead_1.Lead(row.uuid, row.first_name, row.last_name, row.correo, row.phone, row.notification_preference));
        });
    }
}
exports.PgLeadsRepository = PgLeadsRepository;
