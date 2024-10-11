"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
// import multer from '../multerConfig'; // Import multer configuration
const multerConfig_1 = __importDefault(require("../multerConfig")); // Import multer configuration
const router = (0, express_1.Router)();
/**
 * @swagger
 * /users/test-email:
 *   post:
 *     summary: Send a test email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 default: "test@example.com"
 *                 description: Recipient email address
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       500:
 *         description: Server error
 */
router.post('/test-email', UserController_1.default.testEmail);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: "engineering@copora.com"
 *                 description: User email
 *               password:
 *                 type: string
 *                 default: "password"
 *                 format: password
 *                 description: User password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */
router.post('/login', UserController_1.default.login);
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *                 example: John
 *               middleName:
 *                 type: string
 *                 description: Middle name of the user
 *                 example: Michael
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: Password of the user
 *                 example: mypassword
 *               role:
 *                 type: string
 *                 enum: [admin, applicant]
 *                 description: Role of the user
 *                 default: applicant
 *                 example: applicant
 *               createdBy:
 *                 type: string
 *                 enum: [admin, applicant]
 *                 description: User who created this account (e.g., 'admin')
 *                 default: applicant
 *                 example: applicant
 *     responses:
 *       '201':
 *         description: User registered successfully. Please check your email to verify your account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully. Please check your email to verify your account.
 *       '400':
 *         description: Bad request. Required fields are missing or user already exists.
 *       '500':
 *         description: Server error.
 */
router.post('/register', multerConfig_1.default.single('profilePicture'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call UserController method for registration
        yield UserController_1.default.register(req, res);
    }
    catch (error) {
        console.error('Error during registration:', error);
        // No response here; UserController handles it
    }
}));
/**
 * @swagger
 * /users/verify-email:
 *   get:
 *     summary: Verify user email
 *     description: Verify the user's email address using the verification token sent to the user's email.
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The verification token sent to the user's email.
 *     responses:
 *       '200':
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email verified successfully
 *       '400':
 *         description: Invalid or expired verification token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or expired verification token
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 *                 error:
 *                   type: string
 *                   example: Error message details
 */
router.get('/verify-email', UserController_1.default.verifyEmail);
/**
 * @swagger
 * /users/forget-password:
 *   post:
 *     summary: Send password reset email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       400:
 *         description: Email is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/forget-password', UserController_1.default.forgetPassword);
/**
 * @swagger
 * /users/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Token and new password are required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/reset-password', UserController_1.default.resetPassword);
/**
 * @swagger
 * /users/toggle-two-factor:
 *   post:
 *     summary: Toggle two-factor authentication
 *     description: Enables or disables two-factor authentication for the user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Two-factor authentication toggled
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/toggle-two-factor', UserController_1.default.toggleTwoFactor);
/**
 * @swagger
 * /users/send-two-factor-code:
 *   post:
 *     summary: Generate and send two-factor authentication token
 *     tags: [Authentication]
 *     description: Generates a 2FA token and sends it to the user via email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Two-factor authentication token sent
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/send-two-factor-code', UserController_1.default.generateTwoFactorToken);
/**
 * @swagger
 * /users/verify-two-factor:
 *   post:
 *     summary: Verify the two-factor authentication code
 *     description: This endpoint verifies the two-factor authentication code. You should pass the user email and the two-factor code received via email.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *                 description: The email address of the user.
 *               twoFactorCode:
 *                 type: string
 *                 example: "123456"
 *                 description: The two-factor authentication code sent to the user's email.
 *     responses:
 *       200:
 *         description: Successfully verified two-factor authentication code and generated JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                   description: The JWT token for authenticated user.
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     role:
 *                       type: string
 *                       example: "applicant"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     middleName:
 *                       type: string
 *                       example: "Doe"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *       400:
 *         description: Bad request due to missing parameters or invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "User email and two-factor code are required"
 *       401:
 *         description: Unauthorized due to invalid two-factor authentication code.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Invalid two-factor authentication code"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Server error"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */
router.post('/verify-two-factor', UserController_1.default.verifyTwoFactorCode);
/**
 * @swagger
 * /users/update-onboarding-step:
 *   patch:
 *     summary: Update the onboarding step for a user.
 *     description: This endpoint allows updating the onboarding step for a user based on their application number.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - applicationNo
 *               - onboardingStep
 *             properties:
 *               applicationNo:
 *                 type: string
 *                 description: The application number of the user.
 *                 example: "APP123456"
 *               onboardingStep:
 *                 type: integer
 *                 description: The onboarding step number to be updated.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Successfully updated the onboarding step.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Onboarding step updated successfully"
 *       400:
 *         description: Missing required parameters (applicationNo or onboardingStep).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Application number and onboarding step are required"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.patch('/update-onboarding-step', UserController_1.default.updateOnboardingStep);
/**
 * @swagger
 * /users/auth/linkedin/callback:
 *   get:
 *     summary: LinkedIn OAuth callback
 *     tags: [Authentication]
 *     parameters:
 *       - name: code
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: LinkedIn user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Full name of the user
 *                 email:
 *                   type: string
 *                   description: User email address
 *       500:
 *         description: Server error
 *
 */
router.get('/auth/linkedin/callback', UserController_1.default.linkedinCallback);
exports.default = router;
