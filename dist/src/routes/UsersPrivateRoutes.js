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
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware"); // Import the authentication middleware
// import { isAdmin } from '../middlewares/AuthMiddleware'; // Middleware to check if user is admin
const router = (0, express_1.Router)();
/**
 * @swagger
 * /auth/users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [Admin - Private Endpoints]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to retrieve
 *     responses:
 *       '200':
 *         description: A user object
 *       '404':
 *         description: User not found
 *     security:
 *       - bearerAuth: []  # Apply bearerAuth security scheme
 */
router.get('/:id', AuthMiddleware_1.authenticateToken, UserController_1.default.getById);
/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetch all users from the database. Only accessible by admin users.
 *     tags: [Admin - Private Endpoints]
 *     responses:
 *       '200':
 *         description: A list of users
 *     security:
 *       - bearerAuth: []  # Apply bearerAuth security scheme
 */
router.get('/', AuthMiddleware_1.authenticateToken, (0, AuthMiddleware_1.authorizeRoles)('admin'), UserController_1.default.getAll);
/**
 * @swagger
 * /auth/users/status/{status}:
 *   get:
 *     summary: Retrieve users with optional onboarding status filter
 *     tags: [Admin - Private Endpoints]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         description: Filter users by onboarding status
 *         schema:
 *           type: string
 *           enum: [Invitation Sent, Onboarding not Completed, Onboarding Completed, Approved]
 *     responses:
 *       200:
 *         description: A list of users
 *       400:
 *         description: Invalid status provided
 *       404:
 *         description: No users found with the specified status
 *     security:
 *       - bearerAuth: []  # Apply bearerAuth security scheme
 */
router.get('/status/:status', AuthMiddleware_1.authenticateToken, (0, AuthMiddleware_1.authorizeRoles)('admin'), UserController_1.default.getUsersByStatus);
/**
 * @swagger
 * /auth/users/register:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user as a logged-in user. Only accessible by admin users.
 *     tags: [Admin - Private Endpoints]
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
 *                 example: admin
 *               createdBy:
 *                 type: string
 *                 enum: [admin, applicant]
 *                 description: User who created this account (e.g., 'admin')
 *                 default: admin
 *                 example: admin
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
 *     security:
 *       - bearerAuth: []  # Apply bearerAuth security scheme
 */
// router.post('/register', authenticateToken, authorizeRoles('admin'), UserController.register);
router.post('/register', UserController_1.default.register);
/**
 * @swagger
 * /auth/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Admin - Private Endpoints]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to delete
 *     responses:
 *       '204':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 *     security:
 *       - bearerAuth: []  # Apply bearerAuth security scheme
 */
router.delete('/:id', AuthMiddleware_1.authenticateToken, UserController_1.default.delete);
/**
 * @swagger
 * /auth/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update user information by user ID. Optionally, update the password, which will be securely hashed.
 *     tags: [Admin - Private Endpoints]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's new password (will be hashed)
 *               role:
 *                 type: string
 *                 enum: [admin, institution, researcher, explorer]
 *                 description: The user's role
 *     responses:
 *       200:
 *         description: Successfully updated the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid user ID or bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid user ID
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
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
 */
router.put('/:id', AuthMiddleware_1.authenticateToken, UserController_1.default.update);
/**
 * @swagger
 * /auth/users/profile/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [Admin - Private Endpoints]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 default: ""
 *               middleName:
 *                 type: string
 *                 default: ""
 *               lastName:
 *                 type: string
 *                 default: ""
 *               email:
 *                 type: string
 *                 default: ""
 *               phoneNumber:
 *                 type: string
 *                 default: ""
 *               streetAddress:
 *                 type: string
 *                 default: ""
 *               addressLine2:
 *                 type: string
 *                 default: ""
 *               city:
 *                 type: string
 *                 default: ""
 *               stateOrProvince:
 *                 type: string
 *                 default: ""
 *               postalCode:
 *                 type: string
 *                 default: ""
 *               country:
 *                 type: string
 *                 default: ""
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *               UserRole:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - applicant
 *                 default: "applicant"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 *     security:
 *       - bearerAuth: []  # Apply bearerAuth security scheme
 */
router.put('/profile/:id', AuthMiddleware_1.authenticateToken, multerConfig_1.default.single('profilePicture'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            console.log('Uploaded file:', req.file);
        }
        console.log('Form data:', req.body);
        yield UserController_1.default.updateProfile(req, res);
    }
    catch (error) {
        console.error('Error during profile update:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}));
/**
 * @swagger
 * /auth/users/{id}/role:
 *   patch:
 *     summary: Update a user's role
 *     description: Updates the role of a user by their ID. Only accessible by admin users.
 *     tags: [Admin - Private Endpoints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: The new role for the user
 *                 example: admin
 *             required:
 *               - role
 *     responses:
 *       200:
 *         description: User role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User role updated successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       format: int64
 *                       example: 1
 *                     role:
 *                       type: string
 *                       example: admin
 *       400:
 *         description: Invalid input or role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid role
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
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
 *                   example: Internal Server Error
 */
router.patch('/:id/role', AuthMiddleware_1.authenticateToken, (0, AuthMiddleware_1.authorizeRoles)('admin'), UserController_1.default.changeUserRole);
/**
 * @swagger
 * /auth/users/upload-users:
 *   post:
 *     summary: Bulk upload users from an Excel file
 *     description: Allows admin to upload an Excel file containing first name, last name, email, and phone number. The system assigns application IDs and sends an invitation email to each user in the file.
 *     tags: [Admin - Private Endpoints]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Excel file with user data (first name, last name, email, phone number).
 *           required:
 *             - file
 *     responses:
 *       200:
 *         description: Users uploaded successfully, and invitations sent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Users uploaded successfully, and invitations sent.
 *                 processedUsers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                         example: John
 *                       lastName:
 *                         type: string
 *                         example: Doe
 *                       email:
 *                         type: string
 *                         example: johndoe@example.com
 *                       phoneNumber:
 *                         type: string
 *                         example: +1234567890
 *                       role:
 *                         type: string
 *                         example: applicant
 *       400:
 *         description: Bad request, possibly missing file or invalid format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid file or missing fields.
 *       500:
 *         description: Server error while processing the file or sending emails.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error while processing the upload.
 *     security:
 *       - bearerAuth: []  # Apply bearerAuth security scheme
 */
router.post('/upload-users', AuthMiddleware_1.authenticateToken, (0, AuthMiddleware_1.authorizeRoles)('admin'), UserController_1.default.bulkUploadUsers);
exports.default = router;
