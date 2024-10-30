import { Router } from 'express';
import { ContactDetailsController } from '../controllers/ContactDetailsController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: ContactDetails
 *   description: API for managing contact details records
 */

/**
 * @swagger
 * /contact-details:
 *   post:
 *     summary: Create a new Contact Details record
 *     tags: [ContactDetails]
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
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               address_line_1:
 *                 type: string
 *                 example: "123 Main St"
 *               address_line_2:
 *                 type: string
 *                 example: "123 Main St"
 *               country:
 *                 type: string
 *                 example: "USA"
 *               town:
 *                 type: string
 *                 example: "Springfield"
 *               postcode:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       201:
 *         description: Contact Details record created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', ContactDetailsController.createContactDetails);

/**
 * @swagger
 * /contact-details/{applicationNo}:
 *   get:
 *     summary: Get Contact Details by Application Number
 *     tags: [ContactDetails]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     responses:
 *       200:
 *         description: Contact Details retrieved successfully
 *       404:
 *         description: Contact Details not found
 */
router.get('/:applicationNo', ContactDetailsController.getContactDetailsByNo);

/**
 * @swagger
 * /contact-details/{applicationNo}:
 *   put:
 *     summary: Update Contact Details by Application Number
 *     tags: [ContactDetails]
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
 *               phone:
 *                 type: string
 *                 example: "+0987654321"
 *               address_line_1:
 *                 type: string
 *                 example: "456 Elm St"
 *               address_line_2:
 *                 type: string
 *                 example: "123 Main St"
 *               country:
 *                 type: string
 *                 example: "USA"
 *               town:
 *                 type: string
 *                 example: "Shelbyville"
 *               postcode:
 *                 type: string
 *                 example: "54321"
 *     responses:
 *       200:
 *         description: Contact Details updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Contact Details not found
 */
router.put('/:applicationNo', ContactDetailsController.updateContactDetailsByNo);

/**
 * @swagger
 * /contact-details/{applicationNo}:
 *   delete:
 *     summary: Delete Contact Details by Application Number
 *     tags: [ContactDetails]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     responses:
 *       200:
 *         description: Contact Details deleted successfully
 *       404:
 *         description: Contact Details not found
 */
router.delete('/:applicationNo', ContactDetailsController.deleteContactDetailsByNo);

export default router;
