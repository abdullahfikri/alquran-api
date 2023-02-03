import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const Juz = sequelize.define(
    'juz',
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
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { timestamps: false }
);

export default Juz;
