import Translation from '../models/Translation.js';

export const getTranslations = async (req, res) => {
    try {
        const translations = await Translation.findAll({ raw: true });

        res.status(200).json(translations);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
