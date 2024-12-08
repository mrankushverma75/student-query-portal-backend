import { Sequelize } from 'sequelize';

class Database {

    private static instance: Sequelize;

    private constructor() {}

    public static getInstance(): Sequelize {
        if (!Database.instance) {
            Database.instance = new Sequelize(
                process.env.DB_NAME || 'query_system',
                process.env.DB_USER || 'postgres',
                process.env.DB_PASSWORD || 'password',
                {
                    host: process.env.DB_HOST || 'localhost',
                    port: parseInt(process.env.DB_PORT || '5432', 10),
                    dialect: 'postgres',
                    logging: false,
                }
            );
        }
        return Database.instance;
    }
}

export default Database;
