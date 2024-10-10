"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AgreementDocController_1 = require("../controllers/AgreementDocController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /agreements/create-agreement:
 *   post:
 *     summary: Create an agreement document
 *     description: This endpoint generates an agreement document based on user input. The job description is expected to be provided as a string.
 *     tags: [Agreements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationNo:
 *                 type: string
 *                 example: APP-3E5E1BE8
 *                 description: The application number of the applicant
 *     responses:
 *       200:
 *         description: Agreement document created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/create-agreement', AgreementDocController_1.createAgreement);
exports.default = router;
