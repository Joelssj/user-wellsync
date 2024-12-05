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
exports.userRouter = void 0;
const express_1 = require("express");
const dependencies_1 = require("../dependencies/dependencies");
const RabbitMQPublisher_1 = require("../rabbitmq/RabbitMQPublisher"); // Importa el publicador de eventos
const router = (0, express_1.Router)();
exports.userRouter = router;
// Rutas existentes
router.post("/create", (req, res) => dependencies_1.createUserController.run(req, res));
router.post("/login", (req, res) => dependencies_1.loginController.run(req, res));
router.get("/get/:uuid", (req, res) => dependencies_1.getUserByUuidController.run(req, res));
router.delete("/delete/:uuid", (req, res) => dependencies_1.deleteUserByUuidController.run(req, res));
router.put("/update/:uuid", (req, res) => dependencies_1.updateUserByUuidController.run(req, res));
// Nueva ruta para publicar un evento a RabbitMQ
router.post("/event", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userUuid } = req.body;
    // Validación del cuerpo de la solicitud
    if (!userUuid) {
        return res.status(400).json({ error: "El campo 'userUuid' es obligatorio." });
    }
    try {
        // Crear instancia del publicador
        const publisher = new RabbitMQPublisher_1.RabbitMQPublisher();
        // Publicar el evento en la cola `user_events`
        yield publisher.publish("user_events", { userUuid });
        // Confirmar éxito
        console.log("📤 Evento de usuario publicado con éxito:", { userUuid });
        return res.status(200).json({ message: "Evento publicado correctamente" });
    }
    catch (error) {
        // Manejo de errores
        console.error("Error al publicar evento de usuario:", error);
        return res.status(500).json({ error: "Error al publicar el evento" });
    }
}));
