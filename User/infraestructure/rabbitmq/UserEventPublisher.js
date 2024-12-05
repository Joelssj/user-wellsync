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
exports.UserEventPublisher = void 0;
const RabbitMQPublisher_1 = require("./RabbitMQPublisher");
class UserEventPublisher {
    constructor() {
        this.publisher = new RabbitMQPublisher_1.RabbitMQPublisher();
    }
    publishUserEvent(userUuid, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = {
                userUuid,
                email,
            };
            // Publica el mensaje en la cola `user_events`
            yield this.publisher.publish('user_events', message);
            console.log("📤 Evento de usuario publicado:", message);
        });
    }
}
exports.UserEventPublisher = UserEventPublisher;
