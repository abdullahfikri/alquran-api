import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const WordTranslation = sequelize.define(
    'word_translation',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { timestamps: false }
);

export default WordTranslation;
