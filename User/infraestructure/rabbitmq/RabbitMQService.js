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
exports.RabbitMQService = void 0;
// RabbitMQService.ts
const amqplib_1 = __importDefault(require("amqplib"));
class RabbitMQService {
    static getChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.connection) {
                    console.log("Conectando a RabbitMQ..."); // Mensaje antes de la conexión
                    this.connection = yield amqplib_1.default.connect(process.env.RABBITMQ_URL || 'amqp://guest:guest@44.209.18.55');
                    console.log("Conexión exitosa a RabbitMQ"); // Mensaje después de la conexión exitosa
                    this.channel = yield this.connection.createChannel();
                    console.log("Canal de RabbitMQ creado correctamente"); // Mensaje después de crear el canal
                }
                return this.channel;
            }
            catch (error) {
                console.error("Error al conectar a RabbitMQ:", error); // Mensaje en caso de error
                throw error;
            }
        });
    }
    static publishToQueue(queueName, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = yield this.getChannel();
                yield channel.assertQueue(queueName, { durable: true });
                channel.sendToQueue(queueName, Buffer.from(message));
                console.log(`Mensaje enviado a la cola '${queueName}': ${message}`); // Confirmación de envío de mensaje
            }
            catch (error) {
                console.error("Error al enviar mensaje a RabbitMQ:", error); // Mensaje en caso de error al enviar
            }
        });
    }
}
exports.RabbitMQService = RabbitMQService;
