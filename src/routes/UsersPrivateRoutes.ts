import { Router } from 'express';
import UserController from '../controllers/UserController';
// import multer from '../multerConfig'; // Import multer configuration
import uploadDocumentsAndImages  from '../multerConfig'; // Import multer configuration

import { authenticateToken, authorizeRoles } from '../middlewares/AuthMiddleware'; // Import the authentication middleware
// import { isAdmin } from '../middlewares/AuthMiddleware'; // Middleware to check if user is admin

const router = Router();

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
router.get('/:id', authenticateToken, UserController.getById);

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
router.get('/', authenticateToken, authorizeRoles('admin'), UserController.getAll);


/**
 * @swagger
 * /auth/users/status/{status}:
 *   get:
 *     summary: Retrieve users with optional onboarding status and role filter
 *     tags: [Admin - Private Endpoints]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         description: Filter users by onboarding status
 *         schema:
 *           type: string
 *           enum: [Invitation Sent, Onboarding not Completed, Onboarding Completed, Approved]
 *       - in: query
 *         name: role
 *         required: false
 *         description: Filter users by role (default is 'applicant')
 *         schema:
 *           type: string
 *           enum: [admin, applicant, employer]  # Update with valid roles
 *           default: applicant
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *       400:
 *         description: Invalid status or role provided
 *       404:
 *         description: No users found with the specified status and role
 *     security:
 *       - bearerAuth: []  # Apply bearerAuth security scheme
 */
router.get('/status/:status', authenticateToken, authorizeRoles('admin'), UserController.getUsersByStatus);



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
 *               tags:
 *                 type: string
 *                 enum: [Manchester, Driver, Oriental Hotel]
 *                 example: [Manchester, Driver, Oriental Hotel]  
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
router.post('/register',  UserController.register);

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
router.delete('/:id', authenticateToken, UserController.delete);

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
router.put('/:id',  authenticateToken, UserController.update);

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
router.put('/profile/:id',  authenticateToken, uploadDocumentsAndImages.single('profilePicture'), async (req, res) => {
    try {
        if (req.file) {
        console.log('Uploaded file:', req.file);
        }
        console.log('Form data:', req.body);
        await UserController.updateProfile(req, res);
    } catch (error) {
        console.error('Error during profile update:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

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
router.patch('/:id/role',  authenticateToken, authorizeRoles('admin'), UserController.changeUserRole);

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
router.post('/upload-users', authenticateToken, authorizeRoles('admin'), UserController.bulkUploadUsers);

/**
 * @swagger
 * /auth/users/update-onboarding-step:
 *   patch:
 *     summary: Update the onboarding step for a user.
 *     description: This endpoint allows updating the onboarding step for a user based on their application number.
 *     tags: [Admin - Private Endpoints]
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
router.patch('/update-onboarding-step', UserController.updateOnboardingStep);

 /**
 * @swagger
 * /auth/users/update-onboarding-status:
 *   patch:
 *     summary: Update the onboarding status for a user.
 *     description: This endpoint allows updating the onboarding status for a user based on their application number.
 *     tags: [Admin - Private Endpoints]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - applicationNo
 *               - onboardingStatus
 *             properties:
 *               applicationNo:
 *                 type: string
 *                 description: The application number of the user.
 *                 example: "APP123456"
 *               onboardingStatus:
 *                 type: string
 *                 description: The onboarding status to be updated.
 *                 enum:
 *                   - Invitation Sent
 *                   - Onboarding not Completed
 *                   - Onboarding Completed
 *                   - Approved
 *                 example: "Onboarding Completed"
 *     responses:
 *       200:
 *         description: Successfully updated the onboarding status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Onboarding status updated successfully"
 *       400:
 *         description: Missing required parameters (applicationNo or onboardingStatus).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Application number and onboarding status are required"
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
router.patch('/update-onboarding-status', UserController.updateOnboardingStatus);


/**
 * @swagger
 * /auth/users/onboarding-step/{applicationNo}:
 *   get:
 *     summary: Get the onboarding step for a specific application
 *     tags: [Admin - Private Endpoints]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *         example: "APP12345"
 *     responses:
 *       200:
 *         description: Successfully retrieved the onboarding step
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 onboardingStep:
 *                   type: string
 *                   example: "Step 3"
 *       404:
 *         description: Application not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Application not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching onboarding step"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */

router.get('/onboarding-step/:applicationNo', UserController.getOnboardingStepByApplicationNo);

/**
 * @swagger
 * /auth/users/search-by-tags:
 *   post:
 *     summary: Search users by tags
 *     tags: [Admin - Private Endpoints]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of tags to filter users by
 *             example:
 *               tags: ["Manchester", "Oxford"]
 *     responses:
 *       200:
 *         description: Successfully retrieved emails of users with matching tags.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 emails:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of email addresses for users with matching tags
 *               example:
 *                 success: true
 *                 emails: ["user1@example.com", "user2@example.com"]
 *       400:
 *         description: Invalid input, tags must be provided as an array.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 success: false
 *                 message: "Tags must be provided as an array."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 success: false
 *                 message: "An error occurred while searching users."
 */
router.post('/search-by-tags', UserController.searchUsersByTags);

export default router;