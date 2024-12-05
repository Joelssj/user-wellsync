"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
// src/infrastructure/routes/commentRouter.ts
const express_1 = require("express");
const CommentController_1 = require("../controllers/CommentController");
const PgCommentRepository_1 = require("../repositories/PgCommentRepository");
const CreateCommentUseCase_1 = require("../../application/CreateCommentUseCase");
const ListCommentsUseCase_1 = require("../../application/ListCommentsUseCase");
// Instancias
const commentRepository = new PgCommentRepository_1.PgCommentRepository();
const createCommentUseCase = new CreateCommentUseCase_1.CreateCommentUseCase(commentRepository);
const listCommentsUseCase = new ListCommentsUseCase_1.ListCommentsUseCase(commentRepository);
const commentController = new CommentController_1.CommentController(createCommentUseCase, listCommentsUseCase);
// Rutas
const router = (0, express_1.Router)();
exports.commentRouter = router;
router.post("/create", (req, res) => commentController.create(req, res));
router.get("/get", (req, res) => commentController.listAll(req, res));
router.get("/user/:userId", (req, res) => commentController.listByUser(req, res));
