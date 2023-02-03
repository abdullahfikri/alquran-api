import Verse from '../models/Verse.js';
import { Op } from 'sequelize';
// uthmani
export const getUthmaniVerseById = async (req, res) => {
    const { id = null, chapter_id, juz_id, chapter_ayat_id } = req.query;
    console.log(id);
    const attributes = [
        'id',
        'text_uthmani',
        'text_uthmani_simple',
        'number',
        'transliteration',
        'unicode_uthmani',
        'unicode_uthmani_simple',
        'id_juz',
        'id_chapter',
    ];

    if (chapter_ayat_id && !chapter_id) {
        return res.status(404).json({ message: 'Data not found' });
    }
    if (chapter_ayat_id && chapter_id) {
        try {
            const response = await Verse.findOne({
                where: {
                    [Op.and]: [
                        { number: chapter_ayat_id },
                        { id_chapter: chapter_id },
                    ],
                },
                attributes,
                raw: true,
            });

            if (!response) {
                return res.status(404).json({
                    message: `Data not found, verse ${chapter_id}: ayah ${chapter_ayat_id}`,
                });
            }

            const {
                id: id_ayat,
                text_uthmani,
                text_uthmani_simple,
                transliteration,
                unicode_uthmani,
                unicode_uthmani_simple,
                id_juz,
                id_chapter,
                number: id_chapter_ayat,
            } = response;

            return res.status(200).json({
                id_ayat,
                text_uthmani,
                text_uthmani_simple,
                transliteration,
                unicode_uthmani,
                unicode_uthmani_simple,
                id_juz,
                id_chapter,
                id_chapter_ayat,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ message: 'Internal Server Error', error });
        }
    }
    try {
        const {
            id: id_ayat,
            text_uthmani,
            text_uthmani_simple,
            transliteration,
            unicode_uthmani,
            unicode_uthmani_simple,
            id_juz,
            id_chapter,
            number: id_chapter_ayat,
        } = await Verse.findOne({
            where: { id },
            attributes,
            raw: true,
        });

        res.status(200).json({
            id_ayat,
            text_uthmani,
            text_uthmani_simple,
            transliteration,
            unicode_uthmani,
            unicode_uthmani_simple,
            id_juz,
            id_chapter,
            id_chapter_ayat,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const getUthmaniVerseByIdChapter = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const getVerseById = async (req, res) => {
    const { id } = req.query;
    try {
        const response = await Verse.findOne({ where: { id: id }, raw: true });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
