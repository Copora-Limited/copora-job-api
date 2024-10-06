"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProfessionalDetailsController_1 = require("../controllers/ProfessionalDetailsController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: ProfessionalDetails
 *   description: API for managing professional details
 */
/**
 * @swagger
 * /professional-details:
 *   post:
 *     summary: Create new Professional Details records
 *     tags: [ProfessionalDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationNo:
 *                 type: string
 *                 example: "APP-3E5E1BE8"
 *               0:
 *                 type: object
 *                 properties:
 *                   companyName:
 *                     type: string
 *                     example: "Sandsify Systems"
 *                   jobTitle:
 *                     type: string
 *                     example: "My Job title"
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-04"
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-04"
 *                   responsibilities:
 *                     type: string
 *                     example: "Helo"
 *                   achievements:
 *                     type: string
 *                     example: "World"
 *                   referenceContactName:
 *                     type: string
 *                     example: "Shafi Akinropo"
 *                   referenceContactPhone:
 *                     type: string
 *                     example: "08098290445"
 *                   referenceContactEmail:
 *                     type: string
 *                     example: "sandsify@gmail.com"
 *               1:
 *                 type: object
 *                 properties:
 *                   companyName:
 *                     type: string
 *                     example: "Athaqofy"
 *                   jobTitle:
 *                     type: string
 *                     example: "My Job"
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-09"
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-17"
 *                   responsibilities:
 *                     type: string
 *                     example: "Hello"
 *                   achievements:
 *                     type: string
 *                     example: "Dear"
 *                   referenceContactName:
 *                     type: string
 *                     example: "Shafi Akinropo"
 *                   referenceContactPhone:
 *                     type: string
 *                     example: "08145360866"
 *                   referenceContactEmail:
 *                     type: string
 *                     example: "Sakinropo@gmail.com"
 *     responses:
 *       201:
 *         description: Professional Details records created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Professional details created"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       applicationNo:
 *                         type: string
 *                         example: "APP-3E5E1BE8"
 *                       companyName:
 *                         type: string
 *                         example: "Sandsify Systems"
 *                       jobTitle:
 *                         type: string
 *                         example: "My Job title"
 *                       startDate:
 *                         type: string
 *                         format: date
 *                         example: "2024-09-04"
 *                       endDate:
 *                         type: string
 *                         format: date
 *                         example: "2024-09-04"
 *                       responsibilities:
 *                         type: string
 *                         example: "Helo"
 *                       achievements:
 *                         type: string
 *                         example: "World"
 *                       referenceContactName:
 *                         type: string
 *                         example: "Shafi Akinropo"
 *                       referenceContactPhone:
 *                         type: string
 *                         example: "08098290445"
 *                       referenceContactEmail:
 *                         type: string
 *                         example: "sandsify@gmail.com"
 *       400:
 *         description: Bad request - Invalid input format or application number not found
 *       500:
 *         description: Internal server error
 */
router.post('/', ProfessionalDetailsController_1.ProfessionalDetailsController.createProfessionalDetails);
// /**
//  * @swagger
//  * /professional-details/{applicationNo}:
//  *   get:
//  *     summary: Get Professional Details record by Application Number
//  *     tags: [ProfessionalDetails]
//  *     parameters:
//  *       - in: path
//  *         name: applicationNo
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The application number
//  *     responses:
//  *       200:
//  *         description: Professional Details record retrieved successfully
//  *       404:
//  *         description: Professional Details record not found
//  */
// router.get('/:applicationNo', ProfessionalDetailsController.getProfessionalDetailsByNo);
/**
 * @swagger
 * /professional-details/{applicationNo}:
 *   put:
 *     summary: Update Professional Details record by Application Number
 *     tags: [ProfessionalDetails]
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
 *               companyName:
 *                 type: string
 *                 example: "Tech Corp"
 *               jobTitle:
 *                 type: string
 *                 example: "Software Engineer"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2022-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-01"
 *               responsibilities:
 *                 type: string
 *                 example: "Developing and maintaining web applications"
 *               achievements:
 *                 type: string
 *                 example: "Led a successful project deployment"
 *               referenceContactName:
 *                 type: string
 *                 example: "Jane Doe"
 *               referenceContactPhone:
 *                 type: string
 *                 example: "+1234567890"
 *               referenceContactEmail:
 *                 type: string
 *                 example: "jane.doe@example.com"
 *     responses:
 *       200:
 *         description: Professional Details record updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Professional Details record not found
 */
router.put('/:applicationNo', ProfessionalDetailsController_1.ProfessionalDetailsController.updateProfessionalDetailsByNo);
// /**
//  * @swagger
//  * /professional-details/{applicationNo}:
//  *   delete:
//  *     summary: Delete Professional Details record by Application Number
//  *     tags: [ProfessionalDetails]
//  *     parameters:
//  *       - in: path
//  *         name: applicationNo
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The application number
//  *     responses:
//  *       200:
//  *         description: Professional Details record deleted successfully
//  *       404:
//  *         description: Professional Details record not found
//  */
// router.delete('/:applicationNo', ProfessionalDetailsController.deleteProfessionalDetailsByNo);
exports.default = router;
