import { Router } from 'express';
import ReminderController from '../controllers/ReminderController';

const router = Router();

/**
 * @swagger
 * /reminders/onboarding:
 *   post:
 *     summary: Send onboarding reminder emails to users with incomplete onboarding steps.
 *     tags:
 *       - Reminders
 *     responses:
 *       200:
 *         description: Successfully sent onboarding reminders.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Reminder emails sent successfully.'
 *       404:
 *         description: No users found with incomplete onboarding.
 *       500:
 *         description: Internal server error.
 */
router.post('/onboarding', ReminderController.sendOnboardingReminder);

export default router;
