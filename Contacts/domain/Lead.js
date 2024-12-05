"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lead = void 0;
const uuid_1 = require("uuid");
class Lead {
    constructor(uuid = (0, uuid_1.v4)(), first_Name, last_Name, correo, phone, notificationPreference) {
        this.uuid = uuid;
        this.first_Name = first_Name;
        this.last_Name = last_Name;
        this.correo = correo;
        this.phone = phone;
        this.notificationPreference = notificationPreference;
        if (!(0, uuid_1.validate)(this.uuid)) {
            throw new Error("Invalid UUID");
        }
    }
}
exports.Lead = Lead;
