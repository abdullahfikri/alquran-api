import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import sequelize from './utils/database.js';

/* Import routes */
import JuzRoute from './routes/juzRoutes.js';
import ChapterRoute from './routes/chapterRoute.js';
import VerseRoute from './routes/verseRoute.js';
// import db
import Chapter from './models/Chapter.js';
import ChapterAudio from './models/ChapterAudio.js';
import ChapterTranslation from './models/ChapterTranslation.js';
import Juz from './models/Juz.js';
import Language from './models/Language.js';
import Recitation from './models/Recitation.js';
import Tafsir from './models/Tafsir.js';
import Translation from './models/Translation.js';
import Verse from './models/Verse.js';
import VerseAudio from './models/VerseAudio.js';
import VerseTafsir from './models/VerseTafsir.js';
import VerseTranslation from './models/VerseTranslation.js';
import WordTranslation from './models/WordTranslation.js';
import WordVerse from './models/WordVerse.js';

Juz.hasMany(Verse, { foreignKey: 'id_juz' });
Verse.belongsTo(Juz, { foreignKey: 'id_juz' });

Chapter.hasMany(Verse, { foreignKey: 'id_chapter' });
Verse.belongsTo(Chapter, { foreignKey: 'id_chapter' });

Chapter.hasMany(ChapterTranslation, { foreignKey: 'id_chapter' });
ChapterTranslation.belongsTo(Chapter, { foreignKey: 'id_chapter' });

Language.hasMany(ChapterTranslation, { foreignKey: 'id_language' });
ChapterTranslation.belongsTo(Language, { foreignKey: 'id_language' });

Language.hasMany(WordTranslation, { foreignKey: 'id_language' });
WordTranslation.belongsTo(Language, { foreignKey: 'id_language' });

WordVerse.hasMany(WordTranslation, { foreignKey: 'id_word_verse' });
WordTranslation.belongsTo(WordVerse, { foreignKey: 'id_word_verse' });

Verse.hasMany(WordVerse, { foreignKey: 'id_verse' });
WordVerse.belongsTo(Verse, { foreignKey: 'id_verse' });

Translation.hasMany(VerseTranslation, { foreignKey: 'id_translation' });
VerseTranslation.belongsTo(Translation, { foreignKey: 'id_translation' });

Verse.hasMany(VerseTranslation, { foreignKey: 'id_verse' });
VerseTranslation.belongsTo(Verse, { foreignKey: 'id_verse' });

Tafsir.hasMany(VerseTafsir, { foreignKey: 'id_tafsir' });
VerseTafsir.belongsTo(Tafsir, { foreignKey: 'id_tafsir' });

Verse.hasMany(VerseTafsir, { foreignKey: 'id_verse' });
VerseTafsir.belongsTo(Verse, { foreignKey: 'id_verse' });

Recitation.hasMany(VerseAudio, { foreignKey: 'id_recitation' });
VerseAudio.belongsTo(Recitation, { foreignKey: 'id_recitation' });

Verse.hasMany(VerseAudio, { foreignKey: 'id_verse' });
VerseAudio.belongsTo(Verse, { foreignKey: 'id_verse' });

Recitation.hasMany(ChapterAudio, { foreignKey: 'id_recitation' });
ChapterAudio.belongsTo(Recitation, { foreignKey: 'id_recitation' });

Chapter.hasMany(ChapterAudio, { foreignKey: 'id_chapter' });
ChapterAudio.belongsTo(Chapter, { foreignKey: 'id_chapter' });

const app = express();

app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/juzs', JuzRoute);
app.use('/chapters', ChapterRoute);
app.use('/verses', VerseRoute);

const PORT = process.env.PORT || 5000;
sequelize.sync().then(async (reseult) => {
    app.listen(PORT, () => {
        console.log(`Server running at PORT: ${PORT}`);
    });
});
