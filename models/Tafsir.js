import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const Tafsir = sequelize.define(
    'tafsir',
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
            allowNull: false,
        },
        language_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    { timestamps: false }
);

export default Tafsir;
