import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const Recitation = sequelize.define(
    'recitation',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        reciter_name: { type: DataTypes.TEXT(255), allowNull: false },
        style: { type: DataTypes.TEXT(255), allowNull: true },
    },
    { timestamps: false }
);

export default Recitation;
