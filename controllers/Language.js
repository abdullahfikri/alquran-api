import Language from '../models/Language.js';
export const getLanguages = async (req, res) => {
    try {
        const languages = await Language.findAll({ raw: true });

        res.status(200).json(languages);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
