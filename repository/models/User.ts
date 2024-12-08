import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../connection';

interface UserAttributes {
    id: string;
    name: string;
    email: string;
    role: 'Student' | 'Resolver';
    password: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: 'Student' | 'Resolver';
    public isActive!: true | false;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

const sequelize = Database.getInstance();

User.init(
    {
        id: {
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4, 
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        role: {
            type: DataTypes.ENUM('Admin', 'Student', 'Resolver'),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
    }
);

export default User;
