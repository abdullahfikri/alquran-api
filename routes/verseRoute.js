import express from 'express';
import { getUthmaniVerseById, getVerseById } from '../controllers/Verse.js';

const router = express.Router();

router.get('/uthmani', getUthmaniVerseById);

router.get('/get', getVerseById);

export default router;
