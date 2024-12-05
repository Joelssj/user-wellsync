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
exports.PostgresAuditLogRepository = void 0;
const pg_1 = require("../../../database/pg/pg"); // Asegúrate de que query esté correctamente configurado
class PostgresAuditLogRepository {
    save(auditLog) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validación de que el ID es un UUID válido
            if (!auditLog.id || typeof auditLog.id !== 'string' || !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(auditLog.id)) {
                console.error('El ID proporcionado no es un UUID válido');
                throw new Error('ID inválido');
            }
            // Verifica que todos los campos sean válidos
            if (!auditLog.userId || !auditLog.actionType || !auditLog.details || !auditLog.timestamp) {
                console.error('Faltan campos necesarios para guardar el Audit Log');
                throw new Error('Campos faltantes');
            }
            // Consulta SQL para insertar los datos en la tabla
            const sql = `
            INSERT INTO audit_logs (id, user_id, action_type, details, timestamp)
            VALUES ($1, $2, $3, $4, $5)
        `;
            const params = [auditLog.id, auditLog.userId, auditLog.actionType, auditLog.details, auditLog.timestamp];
            try {
                // Ejecuta la consulta
                const res = yield (0, pg_1.query)(sql, params);
                // Verificación de res antes de acceder a rowCount
                if (res && typeof res === 'object' && res.hasOwnProperty('rowCount') && res.rowCount !== null && res.rowCount > 0) {
                    console.log("Audit Log guardado exitosamente en la base de datos.");
                }
                else {
                    console.error("No se insertaron filas en la base de datos o error al obtener rowCount.");
                }
            }
            catch (error) {
                console.error("Error al guardar el Audit Log:", error);
                throw error; // Re-lanza el error para que el proceso falle si no se guarda correctamente
            }
        });
    }
}
exports.PostgresAuditLogRepository = PostgresAuditLogRepository;
