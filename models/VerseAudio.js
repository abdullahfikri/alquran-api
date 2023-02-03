import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const VerseAudio = sequelize.define(
    'verse_audio',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { timestamps: false }
);

export default VerseAudio;
