import { Router } from 'express';
import BulkEmailController from '../controllers/BulkEmailController';

const router = Router();

/**
 * @swagger
 * /admin/send-bulk-email:
 *   post:
 *     summary: Send bulk email to users based on filters
 *     description: Allows admin to send bulk emails to users based on their onboarding status, state, or other criteria.
 *     tags: [Admin - Private Endpoints]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               onboardingStatus:
 *                 type: string
 *                 description: The onboarding status of the users to filter.
 *                 example: Onboarding completed
 *               state:
 *                 type: string
 *                 description: The state of the users to filter.
 *                 example: London
 *           required:
 *             - onboardingStatus
 *     responses:
 *       200:
 *         description: Bulk email sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bulk email sent successfully.
 *                 recipients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         example: johndoe@example.com
 *                       name:
 *                         type: string
 *                         example: John Doe
 *       400:
 *         description: Bad request, missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Onboarding status is required.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error.
 *     security:
 *       - bearerAuth: []  # Apply bearerAuth security scheme
 */
router.post('/admin/send-bulk-email', BulkEmailController.sendBulkEmail);

export default router;
