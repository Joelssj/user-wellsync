"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLeadsController = exports.updateLeadController = exports.deleteLeadByUuidController = exports.getLeadByUuidController = exports.createLeadController = exports.getAllLeadsUseCase = exports.updateLeadUseCase = exports.deleteLeadByUuidUseCase = exports.getLeadByUuidUseCase = exports.createLeadUseCase = exports.rabbitMQPublisher = exports.leadsRepository = void 0;
const pgLeadsRepository_1 = require("../../adapters/pgLeadsRepository"); // Cambiado a PgLeadsRepository
const CreateLeadAndSendTokenUseCase_1 = require("../../../application/CreateLeadAndSendTokenUseCase");
const CreateLeadController_1 = require("../controllers/CreateLeadController");
const GetLeadByUuidUseCase_1 = require("../../../application/GetLeadByUuidUseCase");
const GetLeadByUuidController_1 = require("../controllers/GetLeadByUuidController");
const DeleteLeadByUuidUseCase_1 = require("../../../application/DeleteLeadByUuidUseCase");
const DeleteLeadByUuidController_1 = require("../controllers/DeleteLeadByUuidController");
const RabbitMQPublisher_1 = require("../../../../User/infraestructure/rabbitmq/RabbitMQPublisher");
const UpdateLeadController_1 = require("../controllers/UpdateLeadController");
const UpdateLeadUseCase_1 = require("../../../application/UpdateLeadUseCase");
const GetAllLeadsUseCase_1 = require("../../../application/GetAllLeadsUseCase"); // Nuevo caso de uso
const GetAllLeadsController_1 = require("../controllers/GetAllLeadsController");
exports.leadsRepository = new pgLeadsRepository_1.PgLeadsRepository(); // Cambiado a PgLeadsRepository
exports.rabbitMQPublisher = new RabbitMQPublisher_1.RabbitMQPublisher();
exports.createLeadUseCase = new CreateLeadAndSendTokenUseCase_1.CreateLeadUseCase(exports.leadsRepository, exports.rabbitMQPublisher);
exports.getLeadByUuidUseCase = new GetLeadByUuidUseCase_1.GetLeadByUuidUseCase(exports.leadsRepository);
exports.deleteLeadByUuidUseCase = new DeleteLeadByUuidUseCase_1.DeleteLeadByUuidUseCase(exports.leadsRepository);
exports.updateLeadUseCase = new UpdateLeadUseCase_1.UpdateLeadUseCase(exports.leadsRepository, exports.rabbitMQPublisher);
exports.getAllLeadsUseCase = new GetAllLeadsUseCase_1.GetAllLeadsUseCase(exports.leadsRepository);
exports.createLeadController = new CreateLeadController_1.CreateLeadController(exports.createLeadUseCase);
exports.getLeadByUuidController = new GetLeadByUuidController_1.GetLeadByUuidController(exports.getLeadByUuidUseCase);
exports.deleteLeadByUuidController = new DeleteLeadByUuidController_1.DeleteLeadByUuidController(exports.deleteLeadByUuidUseCase);
exports.updateLeadController = new UpdateLeadController_1.UpdateLeadController(exports.updateLeadUseCase);
exports.getAllLeadsController = new GetAllLeadsController_1.GetAllLeadsController(exports.getAllLeadsUseCase);
