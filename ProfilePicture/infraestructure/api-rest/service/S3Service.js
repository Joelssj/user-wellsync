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
exports.S3Service = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class S3Service {
    constructor() {
        // Verificar que las variables de entorno necesarias están configuradas
        console.log("Verificando variables de entorno para AWS:");
        console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID ? "Cargado correctamente" : "Falta en .env");
        console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY ? "Cargado correctamente" : "Falta en .env");
        console.log("AWS_SESSION_TOKEN:", process.env.AWS_SESSION_TOKEN ? "Cargado correctamente" : "Falta en .env");
        console.log("AWS_REGION:", process.env.AWS_REGION || "Falta en .env");
        console.log("AWS_BUCKET_NAME:", process.env.AWS_BUCKET_NAME || "Falta en .env");
        this.s3 = new aws_sdk_1.default.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            sessionToken: process.env.AWS_SESSION_TOKEN,
            region: process.env.AWS_REGION,
        });
    }
    uploadProfilePicture(fileBuffer, userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileKey = `${userUuid}/${Date.now()}-profile.jpg`;
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileKey,
                Body: fileBuffer,
                ContentType: "image/jpg", // Cambia a "image/png" si es necesario
                ContentDisposition: "inline"
            };
            console.log("Preparando para subir la imagen con los siguientes parámetros:");
            console.log("Bucket:", params.Bucket);
            console.log("File Key:", params.Key);
            console.log("File Size:", fileBuffer.byteLength); // Tamaño del archivo en bytes
            try {
                console.log("Iniciando la subida a S3...");
                const data = yield this.s3.upload(params).promise();
                console.log("Imagen subida exitosamente a S3:", data.Location);
                return data.Location;
            }
            catch (error) {
                // Mensajes de error detallados
                console.error("Error al subir la imagen a S3:", error);
                // Verificar si el error contiene las propiedades code y message típicas de errores de AWS
                if (error && typeof error === "object" && "code" in error && "message" in error) {
                    console.error("Código de error de AWS:", error.code);
                    console.error("Mensaje de error de AWS:", error.message);
                    console.error("Nombre del bucket:", params.Bucket);
                    console.error("Clave del archivo:", params.Key);
                }
                else {
                    console.error("Error desconocido al subir a S3.");
                }
                throw new Error("Error al subir la foto de perfil. Por favor, revisa los logs para más detalles.");
            }
        });
    }
}
exports.S3Service = S3Service;
