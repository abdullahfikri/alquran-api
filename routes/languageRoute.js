import { getLanguages } from '../controllers/Language.js';
import express from 'express';

const router = express.Router();

router.get('/', getLanguages);

export default router;
