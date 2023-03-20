import Verse from '../models/Verse.js';
import VerseAudio from '../models/VerseAudio.js';
import Recitation from '../models/Recitation.js';

export const getRecitation = async (req, res) => {
    try {
        const recitations = await Recitation.findAll({ raw: true });

        res.status(200).json(recitations);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const getAudios = async (req, res) => {
    const { id_audio } = req.params;
    let { chapter_number, juz_number, page, per_page = 10 } = req.query;

    if (chapter_number && juz_number) {
        res.status(400).json({
            message: 'Please choose one between the id juz or id chapter.',
        });
    }
    // Page process
    let startIndex;
    let totalVerses;
    page = +page;
    per_page = +per_page;
    if (page) {
        startIndex = (+page - 1) * per_page;
        totalVerses = await Verse.count({
            where: {
                ...(chapter_number && { id_chapter: chapter_number }),
                ...(juz_number && { id_juz: juz_number }),
            },
        });
    }

    try {
        const audios = await Verse.findAll({
            where: {
                ...(chapter_number && { id_chapter: chapter_number }),
                ...(juz_number && { id_juz: juz_number }),
            },
            ...(page &&
                per_page && {
                    limit: per_page,
                    offset: startIndex,
                }),
            include: [
                {
                    model: VerseAudio,
                    where: {
                        id_recitation: id_audio,
                    },
                },
            ],
            raw: true,
        });

        // const newTranslation = translations.map((translation, id) => {
        //     return {
        //         id: translation['verse_translations.id'],
        //         text: translation['verse_translations.text'],
        //         number_in_chapter: translation.number,
        //         id_verse: translation.id,
        //     };
        // });

        // const meta = {
        //     id_juz: translations[0].id_juz,
        //     id_chapter: translations[0].id_chapter,
        //     id_translation:
        //         translations[0]['verse_translations.translation.id'],
        //     translation_name:
        //         translations[0]['verse_translations.translation.name'],
        //     author_name:
        //         translations[0]['verse_translations.translation.author_name'],
        //     slug: translations[0]['verse_translations.translation.slug'],
        //     language:
        //         translations[0]['verse_translations.translation.language_name'],
        // };

        // const pagination = {
        //     current_page: +page,
        //     total_pages: Math.ceil(totalVerses / per_page),
        //     per_page,
        //     total_records: totalVerses,
        //     start_index: startIndex + 1,
        // };
        // res.status(200).json({
        //     translations: newTranslation,
        //     meta,
        //     ...(page && per_page && { pagination }),
        // });
        res.json(audios);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
