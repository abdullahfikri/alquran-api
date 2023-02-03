import Chapter from '../models/Chapter.js';

export const getAllChapter = async (req, res) => {
    try {
        const response = await Chapter.findAll();

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
