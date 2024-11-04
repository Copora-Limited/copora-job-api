import express from 'express';
import { ApplicationController } from '../controllers/ApplicationController';
import uploadDocumentsAndImages  from '../multerConfig'; // Import multer configuration

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Applicants
 *   description: The applicant management API
 */

/**
 * @swagger
 * /applicant/onboarding-status:
 *   get:
 *     summary: Get all onboarding statuses
 *     tags: [Applicants]
 *     responses:
 *       200:
 *         description: List of onboarding statuses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: Invitation Sent
 *       500:
 *         description: Internal server error
 */
router.get('/onboarding-status', ApplicationController.getOnboardingStatus);

/**
 * @swagger
 * /applicant/download/csv:
 *   get:
 *     summary: Download all applicants' data as CSV
 *     tags:
 *       - Applicants
 *     responses:
 *       200:
 *         description: CSV file downloaded successfully
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *       500:
 *         description: Server error
 */
router.get('/download/csv', ApplicationController.downloadAllApplicantsCsv);

// /**
//  * @swagger
//  * /applicants:
//  *   get:
//  *     summary: Fetch all applicants data
//  *     tags: [Applicants]
//  *     responses:
//  *       200:
//  *         description: Successful response with a list of all applicants
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   applicationNo:
//  *                     type: string
//  *                     description: The application number of the applicant
//  *                   user:
//  *                     type: object
//  *                     description: The user details of the applicant
//  *                   application:
//  *                     type: object
//  *                     description: Application details
//  *                   personalDetails:
//  *                     type: object
//  *                     description: Personal details of the applicant
//  *                   contactDetails:
//  *                     type: object
//  *                     description: Contact details of the applicant
//  *                   professionalDetails:
//  *                     type: object
//  *                     description: Professional details of the applicant
//  *                   educationalDetails:
//  *                     type: object
//  *                     description: Educational details of the applicant
//  *                   healthAndDisability:
//  *                     type: object
//  *                     description: Health and disability information of the applicant
//  *                   foodSafetyQuestionnaire:
//  *                     type: object
//  *                     description: Food safety questionnaire responses of the applicant
//  *                   bankDetails:
//  *                     type: object
//  *                     description: Bank details of the applicant
//  *                   agreementConsent:
//  *                     type: object
//  *                     description: Agreement and consent details of the applicant
//  *                   reference:
//  *                     type: object
//  *                     description: Reference details of the applicant
//  *       500:
//  *         description: Internal server error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   description: Error details
//  */

// router.get('/applicants', ApplicationController.getAllApplicants); // Fetch all applicants data



/**
 * @swagger 
 * /applicant/{applicationNo}:
 *   get:
 *     summary: Fetch single applicant data
 *     tags: [Applicants]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         required: true
 *         description: The application number of the applicant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with applicant details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: The user details of the applicant
 *                 application:
 *                   type: object
 *                   description: Application details
 *                 personalDetails:
 *                   type: object
 *                   description: Personal details of the applicant
 *                 contactDetails:
 *                   type: object
 *                   description: Contact details of the applicant
 *                 professionalDetails:
 *                   type: object
 *                   description: Professional details of the applicant
 *                 educationalDetails:
 *                   type: object
 *                   description: Educational details of the applicant
 *                 healthAndDisability:
 *                   type: object
 *                   description: Health and disability information of the applicant
 *                 foodSafetyQuestionnaire:
 *                   type: object
 *                   description: Food safety questionnaire responses of the applicant
 *                 bankDetails:
 *                   type: object
 *                   description: Bank details of the applicant
 *                 agreementConsent:
 *                   type: object
 *                   description: Agreement and consent details of the applicant
 *                 reference:
 *                   type: object
 *                   description: Reference details of the applicant
 *       404:
 *         description: Applicant not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error details
 */
router.get('/:applicationNo', ApplicationController.getApplicantData); // Fetch single applicant data

/**
 * @swagger
 * /applicant/attempts/{applicationNo}:
 *   get:
 *     summary: Retrieve applicant attempted data by application number
 *     tags: [Applicants]
 *     parameters:
 *       - name: applicationNo
 *         in: path
 *         required: true
 *         description: The application number of the applicant to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved applicant data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: boolean
 *                   personalDetails:
 *                     type: boolean
 *                   contactDetails:
 *                     type: boolean
 *                   generalInfo:
 *                     type: boolean
 *                   nextOfKin:
 *                     type: boolean
 *                   professionalDetails:
 *                     type: boolean
 *                   educationalDetails:
 *                     type: boolean
 *                   healthAndDisability:
 *                     type: boolean
 *                   foodSafetyQuestionnaire:
 *                     type: boolean
 *                   bankDetails:
 *                     type: boolean
 *                   agreementConsent:
 *                     type: boolean
 *                   reference:
 *                     type: boolean
 *       404:
 *         description: Applicant not found
 *       500:
 *         description: Server error
 */
router.get('/attempts/:applicationNo', ApplicationController.getApplicantAttemptedData); // Fetch single applicant data


/**
 * @swagger
 * /applicant/download/{applicationNo}:
 *   get:
 *     summary: Download applicant data as CSV
 *     tags: [Applicants]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         required: true
 *         description: The application number of the applicant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: CSV file with applicant details
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Applicant not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error details
 */
router.get('/download/:applicationNo', ApplicationController.downloadApplicantDataCsv);

/**
 * @swagger
 * /applicant/download/{applicationNo}/pdf:
 *   get:
 *     summary: Download applicant data as PDF
 *     tags:
 *       - Applicants
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: Application number
 *     responses:
 *       200:
 *         description: PDF file downloaded successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *       404:
 *         description: Applicant not found
 *       500:
 *         description: Server error
 */
router.get('/download/:applicationNo/pdf', ApplicationController.downloadApplicantDataPdf);




/**
   * @swagger
   * /applicant/autofill-from-resume:
   *   post:
   *     summary: Autofill application form with uploaded resume
   *     tags: [Applicants]
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               resume:
   *                 type: string
   *                 format: binary
   *                 description: The uploaded resume file
   *     responses:
   *       200:
   *         description: Resume processed and application form auto-filled
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 extractedData:
   *                   type: object
   *                   description: Extracted fields from the resume
   *       400:
   *         description: Resume file is required
   *       500:
   *         description: Error processing resume
   */
router.post('/autofill-from-resume', uploadDocumentsAndImages.single('resume'), ApplicationController.autoFillApplicationFormWithUploadedResume);

/**
 * @swagger
 * /applicant/{applicationNo}:
 *   delete:
 *     summary: Delete applicant data by application number except Authentication details
 *     tags: [Applicants]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         required: true
 *         description: The application number of the applicant to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Confirmation that the applicant data has been deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All data for application number 12345 has been deleted successfully.
 *       500:
 *         description: Internal server error
 */
router.delete('/:applicationNo', ApplicationController.deleteApplicant);


/**
 * @swagger
 * /applicants:
 *   delete:
 *     summary: Delete all applicant data except Admins 
 *     tags: [Applicants]
 *     responses:
 *       200:
 *         description: Confirmation that all applicant data has been deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All applicant data for roles 'applicant' has been deleted successfully.
 *       500:
 *         description: Internal server error
 */
router.delete('/', ApplicationController.deleteApplicants);

// Single file upload (can be either image or document)
// router.post('/upload-file', uploadDocumentsAndImages.single('file'), async (req, res) => {
//     // Handle the uploaded file in your controller logic
//     res.json({ message: 'File uploaded successfully', file: req.file });
// });

// // Multiple file upload (both images and documents)
// router.post('/upload-multiple', uploadDocumentsAndImages.array('files', 10), async (req, res) => {
//     res.json({ message: 'Files uploaded successfully', files: req.files });
// });




export default router;
