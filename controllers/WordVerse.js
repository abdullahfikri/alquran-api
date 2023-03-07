import WordVerse from '../models/WordVerse.js';
import WordTranslation from '../models/WordTranslation.js';
import Language from '../models/Language.js';
import Verse from '../models/Verse.js';
import { Op } from 'sequelize';
const getWord = async ({
    id_chapter,
    id_juz,
    id_language,
    unicode,
    page,
    per_page = 10,
}) => {
    try {
        if (id_chapter > 114 || id_chapter < 1) {
            return { message: 'Id chapter is invalid' };
        }
        if (id_juz < 1 || id_juz > 30) {
            return { message: 'Id Juz is invalid' };
        }

        if (id_language) {
            const wordTrans = await WordTranslation.findOne({
                where: { id_language },
            });
            if (!wordTrans) {
                id_language = 1;
            }
        }
        let verses = [];
        let startIndex;
        let totalVerses;
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
            attributes: ['id', 'id_chapter', 'id_juz'],
            raw: true,
        });

        const wordsRaw = await WordVerse.findAll({
            where: {
                id_verse: {
                    [Op.between]: [verses[0].id, verses[verses.length - 1].id],
                },
            },
            include: [
                ...(id_language
                    ? [
                          {
                              model: WordTranslation,
                              where: {
                                  [Op.and]: [
                                      {
                                          id_word_verse: {
                                              [Op.col]: 'word_verse.id',
                                          },
                                      },
                                      { id_language },
                                  ],
                              },
                              include: [
                                  {
                                      model: Language,
                                      where: {
                                          id: Number(id_language),
                                      },
                                  },
                              ],
                          },
                      ]
                    : []),
            ],
            raw: true,
        });
        const wordsFormat = wordsRaw.map((word) => {
            return {
                id: word.id,
                verse: word.id_verse,
                number_word_in_verse: word.number,
                audio: word.audio,
                trasliteration: word.transliteration,
                text: {
                    text_uthmani: word.text_uthmani,
                    text_uthmani_simple: word.text_uthmani_simple,
                    text_imlaei: word.text_imlaei,
                    text_imlaei_simple: word.text_imlaei_simple,
                    text_indopak: word.text_indopak,
                },
                ...(unicode === 'true' && {
                    unicode: {
                        unicode_uthmani: word.unicode,
                        unicode_uthmani_simple: word.unicode_uthmani_simple,
                        unicode_imlaei: word.unicode_imlaei,
                        unicode_imlaei_simple: word.unicode_imlaei_simple,
                        unicode_indopak: word.unicode_indopak,
                    },
                }),
                ...(id_language && {
                    traslation: {
                        id_language: word['word_translations.id_language'],
                        text: word['word_translations.text'],
                        language: {
                            name: word['word_translations.language.name'],
                            iso_code:
                                word['word_translations.language.iso_code'],
                            native_name:
                                word['word_translations.language.native_name'],
                        },
                    },
                }),
            };
        });
        // return wordsRaw;
        let words = [];
        for (let i = verses[0].id; i <= verses[verses.length - 1].id; i++) {
            const wordArr = wordsFormat.filter((word) => word.verse === i);

            words.push(wordArr);
        }
        return {
            words,
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
    } catch (error) {
        console.log(error);
    }
};
export const getWordByChapter = async (req, res) => {
    const { language: id_language, unicode, page, per_page } = req.query;

    const { id_chapter } = req.params;

    try {
        const word = await getWord({
            id_chapter,
            id_language,
            unicode,
            page,
            per_page,
        });
        res.status(200).json(word);
    } catch (error) {
        res.status(500).json({ message: 'Something went error' });
    }
};

export const getWordByJuz = async (req, res) => {
    const { language: id_language, unicode, page, per_page } = req.query;

    const { id_juz } = req.params;

    try {
        const word = await getWord({
            id_juz,
            id_language,
            unicode,
            page,
            per_page,
        });
        res.status(200).json(word);
    } catch (error) {
        res.status(500).json({ message: 'Something went error' });
    }
};
