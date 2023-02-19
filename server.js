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
import LanguageRoute from './routes/languageRoute.js';
import RecitationRoute from './routes/recitationRoute.js';
import TranslationRoute from './routes/translationRoute.js';
import WordVerseRoute from './routes/wordVerseRoute.js';
// import db config
import dbConfig from './utils/dbConfigModel.js';
dbConfig();

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
app.use('/languages', LanguageRoute);
app.use('/recitations', RecitationRoute);
app.use('/translations', TranslationRoute);
app.use('/words', WordVerseRoute);

const PORT = process.env.PORT || 5000;
sequelize.sync().then(async (reseult) => {
    app.listen(PORT, () => {
        console.log(`Server running at PORT: ${PORT}`);
    });
});
