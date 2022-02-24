import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.DATABASE!,
    process.env.USERNAME!,
    process.env.PASSWORD, {
        dialect: 'mysql',
        host: process.env.HOST,
        port: parseInt(process.env.PORT!)
    }
)
