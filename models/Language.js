import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const Language = sequelize.define(
    'language',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        iso_code: {
            type: DataTypes.STRING(3),
            allowNull: false,
        },
        native_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { timestamps: false }
);

export default Language;
