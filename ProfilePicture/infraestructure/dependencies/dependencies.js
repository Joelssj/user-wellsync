"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfilePictureByUserUuidController = exports.uploadProfilePictureController = exports.getProfilePictureByUserUuidUseCase = exports.uploadProfilePictureUseCase = exports.s3Service = exports.profilePictureRepository = void 0;
// Importaciones necesarias
const PgProfilePictureRepository_1 = require("../adapter/PgProfilePictureRepository");
const UploadProfilePictureUseCase_1 = require("../../application/UploadProfilePictureUseCase");
const UploadProfilePictureController_1 = require("../api-rest/controller/UploadProfilePictureController");
const GetProfilePictureByUserUuidController_1 = require("../api-rest/controller/GetProfilePictureByUserUuidController");
const GetProfilePictureByUserUuidUseCase_1 = require("../../application/GetProfilePictureByUserUuidUseCase");
const S3Service_1 = require("../api-rest/service/S3Service");
// Repositorios
exports.profilePictureRepository = new PgProfilePictureRepository_1.PgProfilePictureRepository();
// Servicios
exports.s3Service = new S3Service_1.S3Service();
// Caso de uso
exports.uploadProfilePictureUseCase = new UploadProfilePictureUseCase_1.UploadProfilePictureUseCase(exports.profilePictureRepository, exports.s3Service);
exports.getProfilePictureByUserUuidUseCase = new GetProfilePictureByUserUuidUseCase_1.GetProfilePictureByUserUuidUseCase(exports.profilePictureRepository);
// Controlador
exports.uploadProfilePictureController = new UploadProfilePictureController_1.UploadProfilePictureController(exports.uploadProfilePictureUseCase);
exports.getProfilePictureByUserUuidController = new GetProfilePictureByUserUuidController_1.GetProfilePictureByUserUuidController(exports.getProfilePictureByUserUuidUseCase);
