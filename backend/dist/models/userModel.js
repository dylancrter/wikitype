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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield pool.query('SELECT * FROM users ORDER BY id ASC');
    return res.rows;
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0] || null;
});
exports.getUserById = getUserById;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [user.name, user.email]);
    return res.rows[0];
});
exports.createUser = createUser;
const updateUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = [];
    const values = [];
    let query = 'UPDATE users SET ';
    if (user.name) {
        values.push(user.name);
        fields.push(`name = $${values.length}`);
    }
    if (user.email) {
        values.push(user.email);
        fields.push(`email = $${values.length}`);
    }
    if (fields.length === 0) {
        return (0, exports.getUserById)(id);
    }
    query += fields.join(', ');
    values.push(id);
    query += ` WHERE id = $${values.length} RETURNING *`;
    const res = yield pool.query(query, values);
    return res.rows[0] || null;
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield pool.query('DELETE FROM users WHERE id = $1', [id]);
    return res.rowCount > 0;
});
exports.deleteUser = deleteUser;
