import Juz from '../models/Juz.js';

export const getAllJuz = async (req, res) => {
    try {
        const response = await Juz.findAll({ raw: true });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
