import express from 'express';
import { getAllJuz } from '../controllers/Juz.js';

const router = express.Router();

router.get('/', getAllJuz);

export default router;
