import { DataTypes } from 'sequelize'
import { sequelize } from '../database/mysql'

export const InformationModel = sequelize.define('Information', {
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
        type: DataTypes.STRING,
        field: 'created_at',
        allowNull: false
    },
    source_id: {
        type: DataTypes.NUMBER,
        field: 'source_id',
        allowNull: false
    },
    company_id: {
        type: DataTypes.INTEGER,
        field: 'company_id',
        allowNull: false
    },
    language: {
        type: DataTypes.ENUM('pt', 'en'),
        field: 'language',
        allowNull: false
    },
    sentiment_score: {
        type: DataTypes.FLOAT,
        field: 'sentiment_score',
        allowNull: false
    }    
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
        tableName: 'Information'
    }
)