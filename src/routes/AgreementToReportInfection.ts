import { Router } from 'express';
import { AgreementToReportInfectionController } from '../controllers/AgreementToReportInfectionController';

const router = Router();

/**
 * @swagger
 * /agreement-to-report-infection:
 *   post:
 *     summary: Create a new Health and Disability record
 *     tags: [HealthAndDisability]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationNo:
 *                 type: string
 *                 example: "APP123456"
 *               agreementToReportInfection:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Health and Disability record created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', AgreementToReportInfectionController.updateOrCreate);
export default router;
