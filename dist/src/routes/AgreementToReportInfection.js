"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AgreementToReportInfectionController_1 = require("../controllers/AgreementToReportInfectionController");
const router = (0, express_1.Router)();
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
router.post('/', AgreementToReportInfectionController_1.AgreementToReportInfectionController.updateOrCreate);
exports.default = router;
