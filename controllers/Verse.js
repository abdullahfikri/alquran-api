import Verse from '../models/Verse.js';
import VerseTranslation from '../models/VerseTranslation.js';
import TranslationModel from '../models/Translation.js';
import VerseTafsir from '../models/VerseTafsir.js';
import Tafsir from '../models/Tafsir.js';
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
    text_uthmani,
    text_imlaei,
    text_indopak,
}) => {
    // Check if id_chapter and id_juz is valid
    if (id_chapter > 114 || id_chapter < 1) {
        return { message: 'Id chapter is invalid' };
    } else if (id_juz < 1 || id_juz > 30) {
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
    // Check if id_recitation is valid
    if (id_recitation) {
        const recitation = await Recitation.findOne({
            where: { id: id_recitation },
        });
        if (!recitation) {
            return { message: 'Id recitation is invalid' };
        }
    }
    // Check if id_tafsir is valid
    if (id_tafsir) {
        const tafsir = await Tafsir.findOne({
            where: { id: id_tafsir },
        });
        if (!tafsir) {
            return { message: 'Id tafsir is invalid' };
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

    if (!id_translation && !id_tafsir && !id_recitation) {
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
                                      { id_translation: id_translation },
                                  ],
                              },
                              include: {
                                  model: TranslationModel,
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
                              include: {
                                  model: Recitation,
                              },
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
            ...(!text_uthmani &&
                !text_indopak &&
                !text_imlaei && {
                    text: {
                        text_uthmani: verse.text_uthmani,
                        text_uthmani_simple: verse.text_uthmani_simple,
                        text_imlaei: verse.text_imlaei,
                        text_imlaei_simple: verse.text_imlaei_simple,
                        text_indopak: verse.text_indopak,
                    },
                }),
            ...(text_uthmani || text_indopak || text_imlaei
                ? {
                      text: {
                          ...(text_uthmani && {
                              text_uthmani: verse.text_uthmani,
                              text_uthmani_simple: verse.text_uthmani_simple,
                          }),
                          ...(text_imlaei && {
                              text_imlaei: verse.text_imlaei,
                              text_imlaei_simple: verse.text_imlaei_simple,
                          }),
                          ...(text_indopak && {
                              text_indopak: verse.text_indopak,
                          }),
                      },
                  }
                : []),
            ...(!text_uthmani &&
                !text_indopak &&
                !text_imlaei && {
                    ...(unicode === 'true' && {
                        unicode: {
                            unicode_uthmani: verse.unicode_uthmani,
                            unicode_uthmani_simple:
                                verse.unicode_uthmani_simple,
                            unicode_imlaei: verse.unicode_imlaei,
                            unicode_imlaei_simple: verse.unicode_imlaei_simple,
                            unicode_indopak: verse.unicode_indopak,
                        },
                    }),
                }),

            ...(text_uthmani || text_indopak || text_imlaei
                ? {
                      ...(unicode === 'true' && {
                          unicode: {
                              ...(text_uthmani && {
                                  unicode_uthmani: verse.unicode_uthmani,
                                  unicode_uthmani_simple:
                                      verse.unicode_uthmani_simple,
                              }),
                              ...(text_imlaei && {
                                  unicode_imlaei: verse.unicode_imlaei,
                                  unicode_imlaei_simple:
                                      verse.unicode_imlaei_simple,
                              }),
                              ...(text_indopak && {
                                  unicode_indopak: verse.unicode_indopak,
                              }),
                          },
                      }),
                  }
                : []),

            ...(id_translation && {
                translation: {
                    id: verse['verse_translations.id'],
                    text: verse['verse_translations.text'],
                    // WARNING: BETA FEATURE (NOT PASS TEST YET)
                    id_translation: verse['verse_translations.id_translation'],
                },
            }),
            ...(id_tafsir && {
                tafsir: {
                    id: verse['verse_tafsirs.id'],
                    text: verse['verse_tafsirs.text'],
                    // WARNING: BETA FEATURE (NOT PASS TEST YET)
                    id_tafsir: id_tafsir,
                },
            }),
            ...(id_recitation && {
                audio: {
                    id: verse['verse_audios.id'],
                    url: verse['verse_audios.url'],
                    // WARNING: BETA FEATURE (NOT PASS TEST YET)
                    id_recitation: id_recitation,
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
export const getUthmaniVerseByJuz = async (req, res) => {
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
            text_uthmani: true,
        });
        return res.status(200).json(verse);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
export const getUthmaniVerseByChapter = async (req, res) => {
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
            text_uthmani: true,
        });
        return res.status(200).json(verse);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

// text_imlaei

export const getImlaeiVerseByJuz = async (req, res) => {
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
            text_imlaei: true,
        });
        return res.status(200).json(verse);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
export const getImlaeiVerseByChapter = async (req, res) => {
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
            text_imlaei: true,
        });
        return res.status(200).json(verse);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
// text_indopak

export const getIndopakVerseByJuz = async (req, res) => {
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
            text_indopak: true,
        });
        return res.status(200).json(verse);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
export const getIndopakVerseByChapter = async (req, res) => {
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
            text_uthmani: true,
        });
        return res.status(200).json(verse);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
