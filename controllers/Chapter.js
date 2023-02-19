import { Op } from 'sequelize';

import Chapter from '../models/Chapter.js';
import ChapterTranslation from '../models/ChapterTranslation.js';
import Language from '../models/Language.js';
import ChapterAudio from '../models/ChapterAudio.js';

const getChapterTranslation = async (language_id, id_chapter) => {
    const chapterTranslation = await ChapterTranslation.findAll({
        where: {
            id_language: language_id,
        },
        raw: true,
    });
    return chapterTranslation;
};

const getNewResponse = async ({
    id_recitation,
    response,
    chapterTranslation,
    language_name,
    id_chapter,
}) => {
    let newResponse = [];
    if (!id_recitation) {
        newResponse = response.map((data, index) => {
            return {
                ...data,
                translated_name: {
                    language_name: language_name.toLowerCase(),
                    translation: chapterTranslation[index].text,
                },
            };
        });
    } else {
        let audios;
        if (id_chapter) {
            audios = await ChapterAudio.findAll({
                where: {
                    [Op.and]: [{ id_recitation }, { id_chapter }],
                },
                raw: true,
            });
        } else {
            audios = await ChapterAudio.findAll({
                where: {
                    id_recitation,
                },
                raw: true,
            });
        }
        if (audios.length === 0) {
            return { message: 'ID Recitation not found' };
        }
        // console.log(audios);
        newResponse = response.map((data, index) => {
            return {
                ...data,
                translated_name: {
                    language_name: language_name.toLowerCase(),
                    translation: chapterTranslation[index].text,
                },
                audios: {
                    url: audios[index].url,
                    id_recitation: audios[index].id_recitation,
                },
            };
        });
    }
    return newResponse;
};

export const getAllChapter = async (req, res) => {
    const { language: iso_code, recitation: id_recitation } = req.query;
    try {
        const response = await Chapter.findAll({ raw: true });

        // if language query not include
        if (!iso_code) {
            const { name: language_name, id: language_id } =
                await Language.findOne({
                    where: {
                        iso_code: 'en',
                    },
                    raw: true,
                });
            const chapterTranslation = await getChapterTranslation(language_id);

            const newResponse = await getNewResponse({
                id_recitation,
                chapterTranslation,
                response,
                language_name,
            });

            return res.status(200).json(newResponse);
        }

        const language = await Language.findOne({
            where: {
                iso_code,
            },
            raw: true,
        });
        let language_name, language_id;
        if (language) {
            const { name, id } = language;
            (language_name = name), (language_id = id);
        } else {
            return res.status(404).json({ message: 'ISO Language not found' });
        }

        const chapterTranslation = await getChapterTranslation(language_id);
        const newResponse = await getNewResponse({
            id_recitation,
            chapterTranslation,
            response,
            language_name,
        });

        res.status(200).json(newResponse);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const getChapter = async (req, res) => {
    const { language: iso_code, recitation: id_recitation } = req.query;
    const { id_chapter } = req.params;
    try {
        const response = await Chapter.findAll({
            raw: true,
            where: {
                number_chapter: id_chapter,
            },
        });
        // When iso code recitation not exist
        if (!iso_code) {
            return res.status(200).json(response);
        }

        const language = await Language.findOne({
            where: {
                iso_code,
            },
            raw: true,
        });
        let language_name, language_id;
        if (language) {
            const { name, id } = language;
            (language_name = name), (language_id = id);
        } else {
            return res.status(404).json({ message: 'ISO Language not found' });
        }

        const chapterTranslation = await ChapterTranslation.findAll({
            where: {
                [Op.and]: [{ id_language: language_id }, { id_chapter }],
            },
            raw: true,
        });

        const newResponse = await getNewResponse({
            id_recitation,
            chapterTranslation,
            response,
            language_name,
            id_chapter,
        });

        res.status(200).json(newResponse);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
