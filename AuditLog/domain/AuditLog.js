"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLog = void 0;
// AuditLog.ts
class AuditLog {
    constructor(id, userId, actionType, details, timestamp) {
        this.id = id;
        this.userId = userId;
        this.actionType = actionType;
        this.details = details;
        this.timestamp = timestamp;
    }
}
exports.AuditLog = AuditLog;
