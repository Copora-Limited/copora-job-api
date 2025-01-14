import { Router } from 'express';
import { ReferenceController } from '../controllers/ReferenceController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reference
 *   description: API for managing references
 */

// /**
//  * @swagger
//  * /reference:
//  *   post:
//  *     summary: Create or update a Reference record
//  *     tags: [Reference]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               applicationNo:
//  *                 type: string
//  *                 example: "APP123456"
//  *               employerName:
//  *                 type: string
//  *                 example: "Tech Corp"
//  *               contactName:
//  *                 type: string
//  *                 example: "John Doe"
//  *               phone:
//  *                 type: string
//  *                 example: "+1234567890"
//  *               email:
//  *                 type: string
//  *                 example: "john.doe@example.com"
//  *               address:
//  *                 type: string
//  *                 example: "123 Main St, Anytown, AN"
//  *     responses:
//  *       201:
//  *         description: Reference record created or updated successfully
//  *       400:
//  *         description: Bad request
//  */
// router.post('/', ReferenceController.createOrUpdateReference);


/**
 * @swagger
 * /reference/{applicationNo}:
 *   get:
 *     summary: Get Reference record by Application Number
 *     tags: [Reference]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     responses:
 *       200:
 *         description: Reference record retrieved successfully
 *       404:
 *         description: Reference record not found
 */
router.get('/:applicationNo', ReferenceController.getReferenceByNo);


/**
 * @swagger
 * /reference:
 *   post:
 *     summary: Create or update Reference records
 *     tags: [Reference]
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
 *                   employerName:
 *                     type: string
 *                     example: "Tech Corp"
 *                   contactName:
 *                     type: string
 *                     example: "John Doe"
 *                   phone:
 *                     type: string
 *                     example: "+1234567890"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *                   address:
 *                     type: string
 *                     example: "123 Main St, Anytown, AN"
 *                   jobTitle:
 *                     type: string
 *                     example: "Software Engineer"
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     example: "2020-01-01"
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     example: "2022-01-01"
 *                   responsibilities:
 *                     type: string
 *                     example: "Developed and maintained web applications"
 *               1:
 *                 type: object
 *                 properties:
 *                   employerName:
 *                     type: string
 *                     example: "Innovate Solutions"
 *                   contactName:
 *                     type: string
 *                     example: "Jane Smith"
 *                   phone:
 *                     type: string
 *                     example: "+0987654321"
 *                   email:
 *                     type: string
 *                     example: "jane.smith@example.com"
 *                   address:
 *                     type: string
 *                     example: "456 Secondary St, Othertown, OT"
 *                   jobTitle:
 *                     type: string
 *                     example: "Project Manager"
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     example: "2018-05-15"
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     example: "2020-10-01"
 *                   responsibilities:
 *                     type: string
 *                     example: "Led project teams and coordinated development"
 *               2:
 *                 type: object
 *                 properties:
 *                   employerName:
 *                     type: string
 *                     example: "NextGen Inc."
 *                   contactName:
 *                     type: string
 *                     example: "Alice Johnson"
 *                   phone:
 *                     type: string
 *                     example: "+1122334455"
 *                   email:
 *                     type: string
 *                     example: "alice.johnson@example.com"
 *                   address:
 *                     type: string
 *                     example: "789 Tertiary St, New City, NC"
 *                   jobTitle:
 *                     type: string
 *                     example: "Senior Developer"
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     example: "2019-03-01"
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     example: "2023-07-30"
 *                   responsibilities:
 *                     type: string
 *                     example: "Architected and implemented new system features"
 *     responses:
 *       201:
 *         description: Reference records created or updated successfully
 *       400:
 *         description: Bad request
 */
router.post('/', ReferenceController.createOrUpdateReferences);



/**
 * @swagger
 * /reference/{id}:
 *   put:
 *     summary: Update Reference record by Application Number
 *     tags: [Reference]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               employerName:
 *                 type: string
 *                 example: "Tech Corp"
 *               contactName:
 *                 type: string
 *                 example: "John Doe"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Anytown, AN"
 *     responses:
 *       200:
 *         description: Reference record updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Reference record not found
 */
router.put('/:id', ReferenceController.updateReferenceById);
// router.put('/references/:id', ReferenceController.updateReferenceById);

/**
 * @swagger
 * /reference/{applicationNo}/{id}:
 *   delete:
 *     summary: Delete Reference record by Application Number and ID
 *     tags: [Reference]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the reference record
 *     responses:
 *       200:
 *         description: Reference record deleted successfully
 *       404:
 *         description: Reference record not found
 */
router.delete('/:applicationNo/:id', ReferenceController.deleteReferenceByNoAndId);


export default router;
