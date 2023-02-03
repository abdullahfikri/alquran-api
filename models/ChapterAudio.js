import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const ChapterAudio = sequelize.define(
    'chapter_audio',
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

export default ChapterAudio;
