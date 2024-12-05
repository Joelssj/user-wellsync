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
exports.CreateCommentUseCase = void 0;
const Comment_1 = require("../domain/Comment");
const uuid_1 = require("uuid");
class CreateCommentUseCase {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    execute(userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = new Comment_1.Comment((0, uuid_1.v4)(), userId, content);
            yield this.commentRepository.createComment(comment);
        });
    }
}
exports.CreateCommentUseCase = CreateCommentUseCase;
