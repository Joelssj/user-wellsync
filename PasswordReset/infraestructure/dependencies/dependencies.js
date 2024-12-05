"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.validateTokenController = exports.createPasswordResetController = exports.resetPasswordUseCase = exports.validateTokenUseCase = exports.createPasswordResetUseCase = exports.rabbitMQPublisher = exports.leadsRepository = exports.usersRepository = exports.passwordResetRepository = void 0;
// dependencies.ts
const MySQLPasswordResetRepository_1 = require("../adapter/MySQLPasswordResetRepository");
const PgUsersRepository_1 = require("../../../User/infraestructure/adapters/PgUsersRepository");
const pgLeadsRepository_1 = require("../../../Contacts/infrestructure/adapters/pgLeadsRepository");
const RabbitMQPublisher_1 = require("../../../User/infraestructure/rabbitmq/RabbitMQPublisher");
// Casos de uso
const CreatePasswordResetUseCase_1 = require("../../application/CreatePasswordResetUseCase");
const ValidateTokenUseCase_1 = require("../../application/ValidateTokenUseCase");
const ResetPasswordUseCase_1 = require("../../application/ResetPasswordUseCase");
// Controladores
const CreatePasswordResetController_1 = require("../controllers/CreatePasswordResetController");
const ValidateTokenController_1 = require("../controllers/ValidateTokenController");
const ResetPasswordController_1 = require("../controllers/ResetPasswordController");
// Repositorios
exports.passwordResetRepository = new MySQLPasswordResetRepository_1.MySQLPasswordResetRepository();
exports.usersRepository = new PgUsersRepository_1.PgUsersRepository();
exports.leadsRepository = new pgLeadsRepository_1.PgLeadsRepository(); // Instancia de la implementación concreta
// RabbitMQ Publisher
exports.rabbitMQPublisher = new RabbitMQPublisher_1.RabbitMQPublisher();
// Casos de uso
exports.createPasswordResetUseCase = new CreatePasswordResetUseCase_1.CreatePasswordResetUseCase(exports.passwordResetRepository, exports.usersRepository, exports.leadsRepository, exports.rabbitMQPublisher);
exports.validateTokenUseCase = new ValidateTokenUseCase_1.ValidateTokenUseCase(exports.passwordResetRepository, exports.usersRepository);
exports.resetPasswordUseCase = new ResetPasswordUseCase_1.ResetPasswordUseCase(exports.passwordResetRepository, exports.usersRepository);
// Controladores
exports.createPasswordResetController = new CreatePasswordResetController_1.CreatePasswordResetController(exports.createPasswordResetUseCase);
exports.validateTokenController = new ValidateTokenController_1.ValidateTokenController(exports.validateTokenUseCase);
exports.resetPasswordController = new ResetPasswordController_1.ResetPasswordController(exports.resetPasswordUseCase);
