import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../connection';

interface QueryAttributes {
    id: string;
    title: string;
    description: string;
    file?: string;
    userId?: string;
    resolverId?: string;
    status: 'Pending' | 'In-Progress' | 'Resolved';
    resolverNote?: string;
    internalNote?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

type QueryCreationAttributes = Optional<QueryAttributes, 'id' | 'file' | 'resolverNote' | 'status'>;

class Query extends Model<QueryAttributes, QueryCreationAttributes> implements QueryAttributes {
    public id!: string;
    public title!: string;
    public description!: string;
    public file?: string;
    public status!: 'Pending' | 'In-Progress' | 'Resolved';
    public resolverNote?: string;
    public userId?: string;
    public resolverId?: string;
    public internalNote?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

const sequelize = Database.getInstance();

Query.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        file: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        resolverId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('Pending', 'In-Progress', 'Resolved'),
            defaultValue: 'Pending',
            allowNull: false,
        },
        resolverNote: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        internalNote: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'queries',
        timestamps: true,
    }
);

export default Query;
