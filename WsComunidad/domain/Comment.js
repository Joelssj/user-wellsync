"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
// src/domain/Comment.ts
class Comment {
    constructor(id, userId, content, createdAt = new Date()) {
        this.id = id;
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt;
    }
}
exports.Comment = Comment;
