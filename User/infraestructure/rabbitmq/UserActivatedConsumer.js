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
exports.UserActivatedConsumer = void 0;
const RabbitMQService_1 = require("./RabbitMQService");
class UserActivatedConsumer {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Iniciando el consumidor de UserActivatedConsumer...");
            const channel = yield RabbitMQService_1.RabbitMQService.getChannel();
            const queue = "user.token.validated";
            yield channel.assertQueue(queue, { durable: true });
            channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg) {
                    console.log("🔔 Mensaje recibido para activación de usuario:", msg.content.toString());
                    const { userUuid } = JSON.parse(msg.content.toString());
                    try {
                        yield this.userRepository.activateUser(userUuid);
                        console.log(`✔️ Usuario ${userUuid} activado en PostgreSQL`);
                        channel.ack(msg); // Confirma el mensaje como procesado
                    }
                    catch (error) {
                        console.error(`❌ Error al activar el usuario ${userUuid}:`, error);
                    }
                }
            }), { noAck: false });
        });
    }
}
exports.UserActivatedConsumer = UserActivatedConsumer;
