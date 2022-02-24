import { DataTypes } from 'sequelize'
import { sequelize } from '../database/mysql'

export const TweetModel = sequelize.define('Tweet', {
    id: {
        type: DataTypes.STRING,
        field: 'id',
        primaryKey: true,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        field: 'text',
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATEONLY,
        field: 'created_at',
        allowNull: false
    },
    author_id: {
        type: DataTypes.STRING,
        field: 'author_id',
        allowNull: false
    },
    company_id: {
        type: DataTypes.INTEGER,
        field: 'company_id',
        allowNull: false
    }    
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    }
)