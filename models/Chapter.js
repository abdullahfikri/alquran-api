import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const Chapter = sequelize.define(
    'chapter',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        number_chapter: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        arabic_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        revelation_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        revelation_place: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        verse_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { timestamps: false }
);

export default Chapter;
