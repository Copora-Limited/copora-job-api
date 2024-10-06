"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HealthAndDisabilityController_1 = require("../controllers/HealthAndDisabilityController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: HealthAndDisability
 *   description: API for managing health and disability information
 */
/**
 * @swagger
 * /health-and-disability:
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
 *               gpName:
 *                 type: string
 *                 example: "Dr. John Doe"
 *               gpAddress:
 *                 type: string
 *                 example: "123 Medical Lane, City, Country"
 *               relevantHealthIssues:
 *                 type: boolean
 *                 example: true
 *               relevantHealthIssuesDetails:
 *                 type: string
 *                 example: "Details about relevant health issues."
 *               majorIllnessTreatment:
 *                 type: boolean
 *                 example: true
 *               majorIllnessDetails:
 *                 type: string
 *                 example: "Details about major illness treatment."
 *               suddenLossOfConsciousness:
 *                 type: boolean
 *                 example: false
 *               consciousnessLossDetails:
 *                 type: string
 *                 example: "Details about consciousness loss."
 *               healthRelatedAbsences:
 *                 type: boolean
 *                 example: true
 *               healthRelatedAbsencesDetails:
 *                 type: string
 *                 example: "Details about health-related absences."
 *               currentMedications:
 *                 type: boolean
 *                 example: true
 *               medicationDetails:
 *                 type: string
 *                 example: "Details about current medications."
 *               physicalLimitations:
 *                 type: boolean
 *                 example: false
 *               limitationsDetails:
 *                 type: string
 *                 example: "Details about physical limitations."
 *               colorVisionDefects:
 *                 type: boolean
 *                 example: false
 *               colorVisionDefectsDetails:
 *                 type: string
 *                 example: "Details about color vision defects."
 *               disabilityAdjustmentNeeds:
 *                 type: string
 *                 example: "Adjustment needs for disabilities."
 *               agreementCertification:
 *                 type: boolean
 *                 example: true
 *               agreementToReportInfection:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Health and Disability record created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', HealthAndDisabilityController_1.HealthAndDisabilityController.createHealthAndDisability);
// /**
//  * @swagger
//  * /health-and-disability/{applicationNo}:
//  *   get:
//  *     summary: Get Health and Disability record by Application Number
//  *     tags: [HealthAndDisability]
//  *     parameters:
//  *       - in: path
//  *         name: applicationNo
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The application number
//  *     responses:
//  *       200:
//  *         description: Health and Disability record retrieved successfully
//  *       404:
//  *         description: Health and Disability record not found
//  */
// router.get('/:applicationNo', HealthAndDisabilityController.getHealthAndDisabilityByNo);
/**
 * @swagger
 * /health-and-disability/{applicationNo}:
 *   put:
 *     summary: Update Health and Disability record by Application Number
 *     tags: [HealthAndDisability]
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
 *               gpName:
 *                 type: string
 *                 example: "Dr. John Doe"
 *               gpAddress:
 *                 type: string
 *                 example: "123 Medical Lane, City, Country"
 *               relevantHealthIssues:
 *                 type: boolean
 *                 example: true
 *               relevantHealthIssuesDetails:
 *                 type: string
 *                 example: "Details about relevant health issues."
 *               majorIllnessTreatment:
 *                 type: boolean
 *                 example: true
 *               majorIllnessDetails:
 *                 type: string
 *                 example: "Details about major illness treatment."
 *               suddenLossOfConsciousness:
 *                 type: boolean
 *                 example: false
 *               consciousnessLossDetails:
 *                 type: string
 *                 example: "Details about consciousness loss."
 *               healthRelatedAbsences:
 *                 type: boolean
 *                 example: true
 *               healthRelatedAbsencesDetails:
 *                 type: string
 *                 example: "Details about health-related absences."
 *               currentMedications:
 *                 type: boolean
 *                 example: true
 *               medicationDetails:
 *                 type: string
 *                 example: "Details about current medications."
 *               physicalLimitations:
 *                 type: boolean
 *                 example: false
 *               limitationsDetails:
 *                 type: string
 *                 example: "Details about physical limitations."
 *               colorVisionDefects:
 *                 type: boolean
 *                 example: false
 *               colorVisionDefectsDetails:
 *                 type: string
 *                 example: "Details about color vision defects."
 *               disabilityAdjustmentNeeds:
 *                 type: string
 *                 example: "Adjustment needs for disabilities."
 *               agreementCertification:
 *                 type: boolean
 *                 example: true
 *               agreementToReportInfection:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Health and Disability record updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Health and Disability record not found
 */
router.put('/:applicationNo', HealthAndDisabilityController_1.HealthAndDisabilityController.updateHealthAndDisabilityByNo);
// /**
//  * @swagger
//  * /health-and-disability/{applicationNo}:
//  *   delete:
//  *     summary: Delete Health and Disability record by Application Number
//  *     tags: [HealthAndDisability]
//  *     parameters:
//  *       - in: path
//  *         name: applicationNo
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The application number
//  *     responses:
//  *       200:
//  *         description: Health and Disability record deleted successfully
//  *       404:
//  *         description: Health and Disability record not found
//  */
// router.delete('/:applicationNo', HealthAndDisabilityController.deleteHealthAndDisabilityByNo);
exports.default = router;
