import express from 'express';
import { getListTafsirs } from '../controllers/Tafsir.js';

const router = express.Router();
router.get('/', getListTafsirs);

export default router;
