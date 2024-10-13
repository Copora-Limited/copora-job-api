"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reminderController_1 = __importDefault(require("../controllers/reminderController"));
const router = (0, express_1.Router)();
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
router.post('/onboarding', reminderController_1.default.sendOnboardingReminder);
exports.default = router;
