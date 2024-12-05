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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signale_1 = require("signale");
const express_1 = __importDefault(require("express"));
const leadRouter_1 = require("./Contacts/infrestructure/api-rest/routes/leadRouter");
const userRouter_1 = require("./User/infraestructure/routes/userRouter");
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const RabbitMQService_1 = require("./User/infraestructure/rabbitmq/RabbitMQService");
const UserActivatedConsumer_1 = require("./User/infraestructure/rabbitmq/UserActivatedConsumer"); // Asegúrate de tener esta importación correcta
const dependencies_1 = require("./User/infraestructure/dependencies/dependencies");
const routes_1 = require("./ProfilePicture/infraestructure/routes/routes");
const passwordResetRouter_1 = require("./PasswordReset/infraestructure/routes/passwordResetRouter");
const commentRouter_1 = require("./WsComunidad/infraestructure/routes/commentRouter");
const app = (0, express_1.default)();
const signale = new signale_1.Signale();
// Configuración de middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Rutas
app.use("/api/v1/lead", leadRouter_1.leadRouter);
app.use("/api/v1/users", userRouter_1.userRouter);
app.use("/api/v1/profile", routes_1.profilePictureRouter);
app.use("/api/v1/reset", passwordResetRouter_1.passwordResetRouter);
app.use("/api/v1/comments", commentRouter_1.commentRouter);
// Inicializar conexión con RabbitMQ y consumidor
function initializeRabbitMQ() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const channel = yield RabbitMQService_1.RabbitMQService.getChannel();
            console.log("RabbitMQ está conectado y listo");
            // Inicializar el consumidor
            const userActivatedConsumer = new UserActivatedConsumer_1.UserActivatedConsumer(dependencies_1.usersRepository);
            yield userActivatedConsumer.start();
            console.log("Consumidor para la activación de usuarios inicializadooo");
        }
        catch (error) {
            console.error("Error al conectar con RabbitMQ o al inicializar el consumidor:", error);
        }
    });
}
// Arrancar el servidor y establecer conexión con RabbitMQ
const port = 3010;
const host = '0.0.0.0';
app.listen(port, host, () => __awaiter(void 0, void 0, void 0, function* () {
    signale.success(`Server online in port ${port}`);
    yield initializeRabbitMQ(); // Llamada para conectar a RabbitMQ e inicializar el consumidor
}));
