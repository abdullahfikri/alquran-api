import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const VerseTafsir = sequelize.define(
    'verse_tafsir',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
    },
    { timestamps: false }
);

export default VerseTafsir;
