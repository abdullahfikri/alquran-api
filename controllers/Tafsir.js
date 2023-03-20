import Tafsir from '../models/Tafsir.js';

export const getListTafsirs = async (req, res) => {
    try {
        const tafsir = await Tafsir.findAll({ raw: true });

        res.status(200).json(tafsir);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
