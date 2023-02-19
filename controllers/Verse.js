import Verse from '../models/Verse.js';
import VerseTranslation from '../models/VerseTranslation.js';
import TranslationModel from '../models/Translation.js';
import VerseTafsir from '../models/VerseTafsir.js';
import VerseAudio from '../models/VerseAudio.js';
import Recitation from '../models/Recitation.js';
import { Op } from 'sequelize';

const getVerse = async ({
    id_translation,
    id_tafsir,
    id_juz,
    id_chapter,
    unicode,
    id_recitation,
    page,
    per_page = 10,
}) => {
    // Check if id_chapter and id_juz is valid
    if (id_chapter > 114 || id_chapter < 1) {
        return { message: 'Id chapter is invalid' };
    }
    if (id_juz < 1 || id_juz > 30) {
        return { message: 'Id Juz is invalid' };
    }

    // Check if id_translation is valid
    if (id_translation) {
        const translation = await TranslationModel.findAll({
            where: { id: id_translation },
        });
        if (!translation.length) {
            return { message: 'Id translation is invalid' };
        }
    }

    let verses = [];
    let startIndex;
    let totalVerses;
    page = +page;
    per_page = +per_page;
    if (page) {
        startIndex = (+page - 1) * per_page;
        totalVerses = await Verse.count({
            where: {
                ...(id_chapter
                    ? { id_chapter: id_chapter }
                    : { id_juz: id_juz }),
            },
        });
    }

    if (!id_translation && !id_tafsir) {
        verses = await Verse.findAll({
            where: {
                ...(id_chapter
                    ? { id_chapter: id_chapter }
                    : { id_juz: id_juz }),
            },
            ...(page && {
                limit: per_page,
                offset: startIndex,
            }),
            raw: true,
        });
    } else {
        verses = await Verse.findAll({
            where: {
                ...(id_chapter
                    ? { id_chapter: id_chapter }
                    : { id_juz: id_juz }),
            },
            ...(page && {
                limit: per_page,
                offset: startIndex,
            }),
            include: [
                ...(id_tafsir
                    ? [
                          {
                              model: VerseTafsir,
                              where: {
                                  [Op.and]: [
                                      {
                                          id_verse: {
                                              [Op.col]: 'verse.id',
                                          },
                                      },
                                      { id_tafsir },
                                  ],
                              },
                          },
                      ]
                    : []),

                ...(id_translation
                    ? [
                          {
                              model: VerseTranslation,
                              where: {
                                  [Op.and]: [
                                      {
                                          id_verse: {
                                              [Op.col]: 'verse.id',
                                          },
                                      },
                                      { id_translation },
                                  ],
                              },
                          },
                      ]
                    : []),
                ...(id_recitation
                    ? [
                          {
                              model: VerseAudio,
                              where: {
                                  [Op.and]: [
                                      {
                                          id_verse: {
                                              [Op.col]: 'verse.id',
                                          },
                                      },
                                      { id_recitation },
                                  ],
                              },
                              include: [
                                  {
                                      model: Recitation,
                                      where: {
                                          id: id_recitation,
                                      },
                                  },
                              ],
                          },
                      ]
                    : []),
            ],
            raw: true,
        });
    }
    const newVerse = verses.map((verse) => {
        return {
            number_in_quran: verse.id,
            id_juz: verse.id_juz,
            id_chapter: verse.id_chapter,
            number_in_chapter: verse.number,
            transliteration: verse.transliteration,
            text: {
                text_uthmani: verse.text_uthmani,
                text_uthmani_simple: verse.text_uthmani_simple,
                text_imlaei: verse.text_imlaei,
                text_imlaei_simple: verse.text_imlaei_simple,
                text_indopak: verse.text_indopak,
            },
            ...(unicode === 'true' && {
                unicode: {
                    unicode_uthmani: verse.unicode_uthmani,
                    unicode_uthmani_simple: verse.unicode_uthmani_simple,
                    unicode_imlaei: verse.unicode_imlaei,
                    unicode_imlaei_simple: verse.unicode_imlaei_simple,
                    unicode_indopak: verse.unicode_indopak,
                },
            }),
            ...(id_translation && {
                translation: {
                    id: verse['verse_translations.id'],
                    text: verse['verse_translations.text'],
                    id_translator: verse['verse_translations.id_translation'],
                },
            }),
            ...(id_tafsir && {
                tafsir: {
                    id: verse['verse_tafsirs.id'],
                    text: verse['verse_tafsirs.text'],
                },
            }),
            ...(id_recitation && {
                audio: {
                    id: verse['verse_audios.id'],
                    url: verse['verse_audios.url'],
                    recitation_info: {
                        id: verse['verse_audios.id_recitation'],
                        reciter: verse['verse_audios.recitation.reciter_name'],
                        style: verse['verse_audios.recitation.style'],
                    },
                },
            }),
        };
    });

    const data = {
        verses: newVerse,
        ...(page && {
            pagination: {
                current_page: +page,
                total_pages: Math.ceil(totalVerses / per_page),
                per_page,
                total_records: totalVerses,
                start_index: startIndex + 1,
            },
        }),
    };
    return data;
};

export const getVerseByJuz = async (req, res) => {
    const {
        translation: id_translation,
        tafsir: id_tafsir,
        unicode,
        recitation: id_recitation,
        page,
        per_page,
    } = req.query;
    const { id_juz } = req.params;
    try {
        const verse = await getVerse({
            id_translation,
            id_tafsir,
            id_juz,
            unicode,
            id_recitation,
            page,
            per_page,
        });
        return res.status(200).json(verse);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const getVerseByChapter = async (req, res) => {
    const {
        translation: id_translation,
        tafsir: id_tafsir,
        unicode,
        recitation: id_recitation,
        page,
        per_page,
    } = req.query;
    const { id_chapter } = req.params;
    try {
        const verse = await getVerse({
            id_translation,
            id_tafsir,
            id_chapter,
            unicode,
            id_recitation,
            page,
            per_page,
        });
        return res.status(200).json(verse);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

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

// text_imlaei

// text_indopak
