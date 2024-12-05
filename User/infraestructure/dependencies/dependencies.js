"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserByUuidController = exports.deleteUserByUuidController = exports.getUserByUuidController = exports.loginController = exports.createUserController = exports.auditService = exports.loginUseCase = exports.updateUserByUuidUseCase = exports.deleteUserByUuidUseCase = exports.getUserByUuidUseCase = exports.createUserUseCase = exports.rabbitMQPublisher = exports.leadsRepository = exports.usersRepository = void 0;
// Importaciones actualizadas sin tokens ni notificaciones
const PgUsersRepository_1 = require("../adapters/PgUsersRepository"); // Cambié MySQL a Pg para PostgreSQL
const CreateUserAndSendTokenUseCase_1 = require("../../application/CreateUserAndSendTokenUseCase");
const CreateUserController_1 = require("../controllers/CreateUserController"); // Controlador de creación de usuario
const LoginUseCase_1 = require("../../application/LoginUseCase");
const LoginController_1 = require("../controllers/LoginController");
const GetUserByUuidUseCase_1 = require("../../application/GetUserByUuidUseCase");
const GetUserByUuidController_1 = require("../controllers/GetUserByUuidController");
const DeleteUserByUuidUseCase_1 = require("../../application/DeleteUserByUuidUseCase");
const DeleteUserByUuidController_1 = require("../controllers/DeleteUserByUuidController");
const UpdateUserByUuidUseCase_1 = require("../../application/UpdateUserByUuidUseCase");
const UpdateUserByUuidController_1 = require("../controllers/UpdateUserByUuidController");
const pgLeadsRepository_1 = require("../../../Contacts/infrestructure/adapters/pgLeadsRepository");
const RabbitMQPublisher_1 = require("../rabbitmq/RabbitMQPublisher");
const PostgresAuditLogRepository_1 = require("../../../AuditLog/infraestructure/adapters/PostgresAuditLogRepository");
const AuditService_1 = require("../../../AuditLog/infraestructure/services/AuditService");
// Repositorios
exports.usersRepository = new PgUsersRepository_1.PgUsersRepository();
exports.leadsRepository = new pgLeadsRepository_1.PgLeadsRepository();
exports.rabbitMQPublisher = new RabbitMQPublisher_1.RabbitMQPublisher();
const auditLogRepository = new PostgresAuditLogRepository_1.PostgresAuditLogRepository();
// Casos de uso
exports.createUserUseCase = new CreateUserAndSendTokenUseCase_1.CreateUserUseCase(exports.usersRepository, exports.leadsRepository, exports.rabbitMQPublisher); // Caso de uso de creación de usuario sin token ni notificaciones
exports.getUserByUuidUseCase = new GetUserByUuidUseCase_1.GetUserByUuidUseCase(exports.usersRepository);
exports.deleteUserByUuidUseCase = new DeleteUserByUuidUseCase_1.DeleteUserByUuidUseCase(exports.usersRepository);
exports.updateUserByUuidUseCase = new UpdateUserByUuidUseCase_1.UpdateUserByUuidUseCase(exports.usersRepository);
exports.loginUseCase = new LoginUseCase_1.LoginUseCase(exports.usersRepository);
exports.auditService = new AuditService_1.AuditService(auditLogRepository);
// Controladores
exports.createUserController = new CreateUserController_1.CreateUserController(exports.createUserUseCase); // Controlador de creación de usuario
exports.loginController = new LoginController_1.LoginController(exports.loginUseCase, exports.auditService); // Inyectamos auditService en LoginController
exports.getUserByUuidController = new GetUserByUuidController_1.GetUserByUuidController(exports.getUserByUuidUseCase);
exports.deleteUserByUuidController = new DeleteUserByUuidController_1.DeleteUserByUuidController(exports.deleteUserByUuidUseCase);
exports.updateUserByUuidController = new UpdateUserByUuidController_1.UpdateUserByUuidController(exports.updateUserByUuidUseCase);
