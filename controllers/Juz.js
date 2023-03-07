import Juz from '../models/Juz.js';
import Verse from '../models/Verse.js';
import Chapter from '../models/Chapter.js';

export const getAllJuz = async (req, res) => {
    try {
        const response = await Juz.findAll({ raw: true });
        const juzs = await Promise.all(
            response.map(async (juz) => {
                const verse = await Verse.findAll({
                    where: {
                        id_juz: juz.id,
                    },
                    raw: true,
                });

                const beginingChapter = await Chapter.findOne({
                    where: {
                        id: verse[0].id_chapter,
                    },
                    raw: true,
                });
                const lastChapter = await Chapter.findOne({
                    where: {
                        id: verse[verse.length - 1].id_chapter,
                    },
                    raw: true,
                });
                const beginningJuzs = {
                    number_in_chapter: verse[0].number,
                    name_chapter: beginingChapter.name,
                };
                const lastJuzs = {
                    number_in_chapter: verse[verse.length - 1].number,
                    name_chapter: lastChapter.name,
                };
                return {
                    id: juz.id,
                    name: juz.name,
                    number: juz.number,
                    juzStartInfo: `${beginningJuzs.name_chapter} - ${beginningJuzs.number_in_chapter}`,
                    juzEndInfo: `${lastJuzs.name_chapter} - ${lastJuzs.number_in_chapter}`,
                };
            })
        );
        res.status(200).json(juzs);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
