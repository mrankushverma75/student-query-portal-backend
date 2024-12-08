"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
class Query extends sequelize_1.Model {
}
const sequelize = connection_1.default.getInstance();
Query.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    file: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    resolverId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('Pending', 'In Progress', 'Resolved'),
        defaultValue: 'Pending',
        allowNull: false,
    },
    resolverNote: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    resolutionSummary: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'queries',
    timestamps: true,
});
exports.default = Query;
