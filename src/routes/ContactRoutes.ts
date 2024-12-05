import { Router } from 'express';
import ContactController from '../controllers/ContactController';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' }); // Setup for file uploads

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Endpoints for customer contact and inquiries
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Send a contact form email
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the sender
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: Last name of the sender
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: Email address of the sender
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 description: Phone number of the sender
 *                 example: "+1234567890"
 *               subject:
 *                 type: string
 *                 description: Subject of the message
 *                 example: Inquiry about services
 *               message:
 *                 type: string
 *                 description: The message content
 *                 example: "I would like to know more about your services."
 *     responses:
 *       200:
 *         description: Contact form email sent successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Failed to process the request
 */
router.post('/contact', ContactController.sendContactFormEmail);

/**
 * @swagger
 * /api/contact/inquiry:
 *   post:
 *     summary: Submit a customer inquiry and notify the admin
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the customer
 *                 example: Jane
 *               lastName:
 *                 type: string
 *                 description: Last name of the customer
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: Email address of the customer
 *                 example: jane.doe@example.com
 *               phone:
 *                 type: string
 *                 description: Phone number of the customer
 *                 example: "+9876543210"
 *               subject:
 *                 type: string
 *                 description: Subject of the inquiry
 *                 example: Product Inquiry
 *               message:
 *                 type: string
 *                 description: The inquiry message
 *                 example: "I am interested in learning more about your product."
 *               attachment:
 *                 type: string
 *                 format: binary
 *                 description: Optional file attachment
 *     responses:
 *       200:
 *         description: Inquiry submitted successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Failed to process the inquiry
 */
router.post('/inquiry', upload.single('attachment'), ContactController.handleInquiry);

export default router;
