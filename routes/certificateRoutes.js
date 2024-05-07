// src/routes/certificateRoutes.js

import express from 'express';
import { getCertificates, generateCertificate, viewCertificate } from '../controllers/certificateController.js';

const router = express.Router();

router.get('/certificates', getCertificates);
router.post('/generate-certificate', generateCertificate);
router.get('/view-certificate/:id', viewCertificate);

export default router;
