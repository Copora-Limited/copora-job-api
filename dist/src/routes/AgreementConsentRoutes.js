"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AgreementConsentController_1 = require("../controllers/AgreementConsentController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: AgreementConsent
 *   description: API for managing agreement consent records
 */
/**
 * @swagger
 * /agreement-consent:
 *   post:
 *     summary: Create a new Agreement Consent
 *     tags: [AgreementConsent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationNo:
 *                 type: string
 *                 example: "APP12345"
 *               isAgreed:
 *                 type: string
 *                 example: true
 *     responses:
 *       201:
 *         description: Agreement Consent created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', AgreementConsentController_1.AgreementConsentController.create);
/**
 * @swagger
 * /agreement-consent/{applicationNo}:
 *   get:
 *     summary: Get Agreement Consent by Application Number
 *     tags: [AgreementConsent]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     responses:
 *       200:
 *         description: Agreement Consent retrieved successfully
 *       404:
 *         description: Agreement Consent not found
 */
router.get('/:applicationNo', AgreementConsentController_1.AgreementConsentController.getAgreementConsentByNo);
/**
 * @swagger
 * /agreement-consent/{applicationNo}:
 *   put:
 *     summary: Update Agreement Consent by Application Number
 *     tags: [AgreementConsent]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employmentStatusDeclaration:
 *                 type: string
 *                 example: "Self-employed"
 *               declarationAgreement:
 *                 type: string
 *                 example: "I agree to the updated terms and conditions."
 *               isAgreed:
 *                 type: string
 *                 example: true
 *     responses:
 *       200:
 *         description: Agreement Consent updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Agreement Consent not found
 */
router.put('/:applicationNo', AgreementConsentController_1.AgreementConsentController.updateAgreementConsentByNo);
/**
 * @swagger
 * /agreement-consent/{applicationNo}:
 *   delete:
 *     summary: Delete Agreement Consent by Application Number
 *     tags: [AgreementConsent]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     responses:
 *       200:
 *         description: Agreement Consent deleted successfully
 *       404:
 *         description: Agreement Consent not found
 */
router.delete('/:applicationNo', AgreementConsentController_1.AgreementConsentController.deleteAgreementConsentByNo);
exports.default = router;
