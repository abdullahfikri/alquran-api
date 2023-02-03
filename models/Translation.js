import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const Translation = sequelize.define(
    'translation',
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
        author_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        language_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    { timestamps: false }
);

export default Translation;
