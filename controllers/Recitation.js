import Recitation from '../models/Recitation.js';

export const getRecitation = async (req, res) => {
    try {
        const recitations = await Recitation.findAll({ raw: true });

        res.status(200).json(recitations);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
