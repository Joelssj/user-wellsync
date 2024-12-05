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
exports.query = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const signale_1 = require("signale");
// Cargar variables de entorno desde el archivo .env
dotenv_1.default.config();
const signale = new signale_1.Signale();
// Configuración de la conexión con PostgreSQL
const sslConfig = process.env.DB_SSL === 'true' ? { ssl: { rejectUnauthorized: false } } : {};
// Crear configuración del pool de conexiones
const config = Object.assign({ host: process.env.DB_HOST, user: process.env.DB_USER, database: process.env.DB_DATABASE, password: process.env.DB_PASSWORD, port: parseInt(process.env.DB_PORT || "5432") }, sslConfig);
// Crear el pool de conexiones
const pool = new pg_1.Pool(config);
// Función para probar la conexión a la base de datos
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield pool.connect();
            signale.success("Conexión exitosa a la BD de PostgreSQL");
            console.log("PostgreSQL conectado correctamente");
            client.release(); // Liberar el cliente después de la conexión
        }
        catch (error) {
            signale.error("Error al conectar a la BD:", error);
            console.error("Error al conectar a la BD:", error);
        }
    });
}
// Llamar a la función de prueba de conexión
testConnection();
// Función para realizar consultas a la base de datos
function query(sql, params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield pool.connect();
            const result = yield client.query(sql, params);
            client.release(); // Liberar el cliente después de la consulta
            return result; // Devolver el resultado de la consulta
        }
        catch (error) {
            signale.error(error);
            return null; // Devolver null si ocurre un error
        }
    });
}
exports.query = query;
// import dotenv from "dotenv";
// import { Pool } from "pg";
// import { Signale } from "signale";
// dotenv.config();
// const signale = new Signale();
// const config = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: parseInt(process.env.DB_PORT || "5432"),
// };
// const pool = new Pool(config);
// async function testConnection() {
//   try {
//     const client = await pool.connect();
//     signale.success("Conexión exitosa a la BD de PostgreSQL");
//     console.log("PostgreSQL conectado correctamente");
//     client.release();
//   } catch (error) {
//     signale.error("Error al conectar a la BD:", error);
//     console.error("Error al conectar a la BD:", error);
//   }
// }
// testConnection();
// export async function query(sql: string, params: any[]) {
//   try {
//     const client = await pool.connect();
//     const result = await client.query(sql, params);
//     client.release();
//     return result;
//   } catch (error) {
//     signale.error(error);
//     return null;
//   }
// }
