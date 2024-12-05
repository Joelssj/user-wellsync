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
exports.LoginController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginController {
    constructor(loginUseCase, auditService // Inyecta el servicio de auditoría
    ) {
        this.loginUseCase = loginUseCase;
        this.auditService = auditService;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, password } = req.body;
            // Verificación de que el correo y la contraseña están presentes
            if (!correo || !password) {
                try {
                    yield this.auditService.logAction('unknown', 'login_failed', 'Correo o contraseña no proporcionados');
                }
                catch (auditError) {
                    console.error('Error al guardar la auditoría de login fallido:', auditError);
                }
                return res.status(400).send({
                    status: "Error",
                    token: '',
                    message: "Correo o contraseña no proporcionados",
                });
            }
            try {
                // Llamada al caso de uso para autenticar al usuario
                const user = yield this.loginUseCase.run(correo, password);
                if (user) {
                    // Si el usuario es encontrado, generar el JWT
                    const token = jsonwebtoken_1.default.sign({ correo }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
                    try {
                        // Registro de auditoría de inicio de sesión exitoso
                        yield this.auditService.logAction(user.userUuid, 'login', 'Inicio de sesión exitoso');
                    }
                    catch (auditError) {
                        console.error('Error al guardar la auditoría de login exitoso:', auditError);
                    }
                    // Respuesta exitosa
                    res.status(200).send({
                        status: "OK",
                        token: token,
                        message: "Inicio de sesión exitoso",
                        userUuid: user.userUuid,
                        leadUuid: user.leadUuid,
                    });
                }
                else {
                    // Si el usuario no es encontrado, registrar como intento fallido
                    try {
                        yield this.auditService.logAction('unknown', 'login_failed', `Intento de inicio de sesión fallido para el correo: ${correo}`);
                    }
                    catch (auditError) {
                        console.error('Error al guardar la auditoría de login fallido:', auditError);
                    }
                    // Respuesta de error de autenticación
                    res.status(400).send({
                        status: "Error",
                        token: '',
                        message: "El usuario o la contraseña son incorrectos",
                    });
                }
            }
            catch (error) {
                // Registro de auditoría de error en el proceso de inicio de sesión
                try {
                    yield this.auditService.logAction('unknown', 'login_error', `Error en el proceso de inicio de sesión: ${error}`);
                }
                catch (auditError) {
                    console.error('Error al guardar la auditoría de login error:', auditError);
                }
                // Respuesta de error interno
                res.status(500).send({
                    status: "Error",
                    message: "Ha ocurrido un error en el inicio de sesión",
                    error: error,
                });
            }
        });
    }
}
exports.LoginController = LoginController;

