import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const WordVerse = sequelize.define(
    'word_verse',
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
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        audio: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        transliteration: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        unicode: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { timestamps: false }
);

export default WordVerse;
