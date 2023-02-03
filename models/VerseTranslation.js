import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const VerseTranslation = sequelize.define(
    'verse_translation',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        text: { type: DataTypes.TEXT, allowNull: false },
    },
    { timestamps: false }
);

export default VerseTranslation;
