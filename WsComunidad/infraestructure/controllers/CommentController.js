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
exports.CommentController = void 0;
class CommentController {
    constructor(createCommentUseCase, listCommentsUseCase) {
        this.createCommentUseCase = createCommentUseCase;
        this.listCommentsUseCase = listCommentsUseCase;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, content } = req.body;
            try {
                yield this.createCommentUseCase.execute(userId, content);
                return res.status(201).json({ message: "Comentario creado con éxito" });
            }
            catch (error) {
                return res.status(400).json({ error: error });
            }
        });
    }
    listAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield this.listCommentsUseCase.listAll();
                return res.status(200).json(comments);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    listByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const comments = yield this.listCommentsUseCase.listByUser(userId);
                return res.status(200).json(comments);
            }
            catch (error) {
                return res.status(400).json({ error: error });
            }
        });
    }
}
exports.CommentController = CommentController;
