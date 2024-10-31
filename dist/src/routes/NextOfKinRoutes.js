"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NextOfKinController_1 = require("../controllers/NextOfKinController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Next Of Kin
 *   description: Operations related to Next of Kin information
 */
/**
 * @swagger
 * /next-of-kin:
 *   post:
 *     summary: Create or update Next of Kin information
 *     description: Creates a new Next of Kin entry or updates an existing one based on the `applicationNo`.
 *     tags: [Next Of Kin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationNo:
 *                 type: string
 *                 description: The application number of the applicant
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               relationship:
 *                 type: string
 *                 description: Relationship of the Next of Kin to the applicant
 *               email:
 *                 type: string
 *                 description: Email of the Next of Kin
 *               phone:
 *                 type: string
 *                 description: Phone number of the Next of Kin
 *               address:
 *                 type: string
 *                 description: Address of the Next of Kin
 *             required:
 *               - applicationNo
 *               - firstName
 *               - lastName
 *               - relationship
 *     responses:
 *       201:
 *         description: Successfully created the Next of Kin entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Entry created
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID of the newly created entry
 *                     applicationNo:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     relationship:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *       200:
 *         description: Successfully updated the existing Next of Kin entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Next of Kin updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID of the updated entry
 *                     applicationNo:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     relationship:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *       400:
 *         description: Applicant does not exist
 *       500:
 *         description: Internal Server Error
 */
router.post('/', NextOfKinController_1.NextOfKinController.create);
/**
 * @swagger
 * /next-of-kin:
 *   get:
 *     summary: Retrieve all Next of Kin entries
 *     tags: [Next Of Kin]
 *     responses:
 *       200:
 *         description: A list of Next of Kin entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   applicationNo:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   relationship:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   address:
 *                     type: string
 */
router.get('/', NextOfKinController_1.NextOfKinController.getAll);
/**
 * @swagger
 * /next-of-kin/{applicationNo}:
 *   get:
 *     summary: Retrieve a Next of Kin entry by ID
 *     tags: [Next Of Kin]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Next of Kin entry
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The Next of Kin entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 applicationNo:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 relationship:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 address:
 *                   type: string
 *       404:
 *         description: Next of Kin entry not found
 */
router.get('/:applicationNo', NextOfKinController_1.NextOfKinController.getByApplicationNo);
/**
 * @swagger
 * /next-of-kin/{id}:
 *   put:
 *     summary: Update a Next of Kin entry by ID
 *     tags: [Next Of Kin]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Next of Kin entry
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               relationship:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the Next of Kin entry
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Next of Kin entry not found
 */
router.put('/:id', NextOfKinController_1.NextOfKinController.update);
/**
 * @swagger
 * /next-of-kin/{id}:
 *   delete:
 *     summary: Delete a Next of Kin entry by ID
 *     tags: [Next Of Kin]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Next of Kin entry
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted the Next of Kin entry
 *       404:
 *         description: Next of Kin entry not found
 */
router.delete('/:id', NextOfKinController_1.NextOfKinController.delete);
exports.default = router;
