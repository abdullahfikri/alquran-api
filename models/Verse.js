import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const Verse = sequelize.define(
    'verse',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        text_uthmani: { type: DataTypes.TEXT, allowNull: true },
        text_uthmani_simple: { type: DataTypes.TEXT, allowNull: true },
        text_imlaei: { type: DataTypes.TEXT, allowNull: true },
        text_imlaei_simple: { type: DataTypes.TEXT, allowNull: true },
        text_indopak: { type: DataTypes.TEXT, allowNull: true },
        number: { type: DataTypes.INTEGER, allowNull: false },
        transliteration: { type: DataTypes.TEXT, allowNull: false },
        unicode_uthmani: DataTypes.TEXT,
        unicode_uthmani_simple: DataTypes.TEXT,
        unicode_imlaei: DataTypes.TEXT,
        unicode_imlaei_simple: DataTypes.TEXT,
        unicode_indopak: DataTypes.TEXT,
    },
    { timestamps: false }
);

export default Verse;
