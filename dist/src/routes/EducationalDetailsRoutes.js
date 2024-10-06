"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EducationalDetailsController_1 = require("../controllers/EducationalDetailsController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: EducationalDetails
 *   description: API for managing educational details records
 */
/**
 * @swagger
 * /educational-details:
 *   post:
 *     summary: Create or update multiple Educational Details records
 *     tags: [EducationalDetails]
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
 *                   schoolName:
 *                     type: string
 *                     example: "Springfield University"
 *                   certificateObtained:
 *                     type: string
 *                     example: "Bachelor of Science"
 *                   courseOfStudy:
 *                     type: string
 *                     example: "Computer Science"
 *                   yearAdmitted:
 *                     type: number
 *                     example: 2015
 *                   yearGraduated:
 *                     type: number
 *                     example: 2019
 *               1:
 *                 type: object
 *                 properties:
 *                   schoolName:
 *                     type: string
 *                     example: "Greenfield College"
 *                   certificateObtained:
 *                     type: string
 *                     example: "Associate Degree"
 *                   courseOfStudy:
 *                     type: string
 *                     example: "Software Engineering"
 *                   yearAdmitted:
 *                     type: number
 *                     example: 2013
 *                   yearGraduated:
 *                     type: number
 *                     example: 2015
 *     responses:
 *       201:
 *         description: Educational Details records created or updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Educational details processed successfully"
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
 *                       schoolName:
 *                         type: string
 *                         example: "Springfield University"
 *                       certificateObtained:
 *                         type: string
 *                         example: "Bachelor of Science"
 *                       courseOfStudy:
 *                         type: string
 *                         example: "Computer Science"
 *                       yearAdmitted:
 *                         type: number
 *                         example: 2015
 *                       yearGraduated:
 *                         type: number
 *                         example: 2019
 *       400:
 *         description: Bad request - Invalid input format or application number not found
 *       500:
 *         description: Internal server error
 */
router.post('/', EducationalDetailsController_1.EducationalDetailsController.createEducationalDetails);
// /**
//  * @swagger
//  * /educational-details/{applicationNo}:
//  *   get:
//  *     summary: Get Educational Details by Application Number
//  *     tags: [EducationalDetails]
//  *     parameters:
//  *       - in: path
//  *         name: applicationNo
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The application number
//  *     responses:
//  *       200:
//  *         description: Educational Details retrieved successfully
//  *       404:
//  *         description: Educational Details not found
//  */
// router.get('/:applicationNo', EducationalDetailsController.getEducationalDetailsByNo);
/**
 * @swagger
 * /educational-details/{applicationNo}:
 *   put:
 *     summary: Update Educational Details by Application Number
 *     tags: [EducationalDetails]
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
 *               schoolName:
 *                 type: string
 *                 example: "Springfield University"
 *               certificateObtained:
 *                 type: string
 *                 example: "Bachelor of Arts"
 *               courseOfStudy:
 *                 type: string
 *                 example: "Graphic Design"
 *               yearAdmitted:
 *                 type: number
 *                 example: 2016
 *               yearGraduated:
 *                 type: number
 *                 example: 2020
 *     responses:
 *       200:
 *         description: Educational Details updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Educational Details not found
 */
router.put('/:applicationNo', EducationalDetailsController_1.EducationalDetailsController.updateEducationalDetailsByNo);
// /**
//  * @swagger
//  * /educational-details/{applicationNo}:
//  *   delete:
//  *     summary: Delete Educational Details by Application Number
//  *     tags: [EducationalDetails]
//  *     parameters:
//  *       - in: path
//  *         name: applicationNo
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The application number
//  *     responses:
//  *       200:
//  *         description: Educational Details deleted successfully
//  *       404:
//  *         description: Educational Details not found
//  */
// router.delete('/:applicationNo', EducationalDetailsController.deleteEducationalDetailsByNo);
exports.default = router;
