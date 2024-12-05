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
exports.PgCommentRepository = void 0;
const pg_1 = require("../../../database/pg/pg");
class PgCommentRepository {
    createComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      INSERT INTO comments (id, user_id, content, created_at)
      VALUES ($1, $2, $3, $4)
    `;
            const params = [comment.id, comment.userId, comment.content, comment.createdAt];
            yield (0, pg_1.query)(sql, params);
        });
    }
    getAllComments() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
        SELECT
            comments.id,
            comments.content,
            comments.created_at,
            users.uuid AS user_id,
            leads.first_name AS first_name,
            leads.last_name AS last_name,
            profile_pictures.url AS profile_picture
        FROM comments
        JOIN users ON comments.user_id = users.uuid
        JOIN leads ON users.lead_uuid = leads.uuid
        LEFT JOIN profile_pictures ON users.uuid = profile_pictures.user_uuid
        ORDER BY comments.created_at ASC;
    `;
            const result = yield (0, pg_1.query)(sql, []); // Agrega un array vacío como segundo argumento
            if (!result || !result.rows || result.rows.length === 0) {
                return [];
            }
            return result.rows.map((row) => ({
                id: row.id,
                content: row.content,
                createdAt: row.created_at,
                userId: row.user_id,
                firstName: row.first_name,
                lastName: row.last_name,
                profilePicture: row.profile_picture,
            }));
        });
    }
    getCommentsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      SELECT 
        comments.id, 
        comments.content, 
        comments.created_at, 
        users.name AS user_name, 
        users.profile_picture AS user_profile_picture
      FROM comments
      JOIN users ON comments.user_id = users.uuid
      WHERE comments.user_id = $1
      ORDER BY comments.created_at DESC
    `;
            const params = [userId];
            const result = yield (0, pg_1.query)(sql, params); // Pasar los parámetros correctamente
            if (!result || !result.rows) {
                return []; // Manejar el caso en que no haya resultados
            }
            return result.rows.map((row) => ({
                id: row.id,
                userId,
                content: row.content,
                createdAt: row.created_at,
                userName: row.user_name,
                profilePicture: row.user_profile_picture,
            }));
        });
    }
}
exports.PgCommentRepository = PgCommentRepository;
