import { Router } from 'express';
import { GeneralInfoController } from '../controllers/GeneralInfoController';
import uploadDocumentsAndImages from '../multerConfig';

const router = Router();

// Route to create a new GeneralInfo entry

/**
 * @swagger
 * /general-info:
 *   post:
 *     summary: Create a new General Info entry
 *     tags: [GeneralInfo]
 *     description: This endpoint allows the creation of a new General Info entry.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               applicationNo:
 *                 type: string
 *                 description: The application number, must be unique.
 *               plateWaiting:
 *                 type: boolean
 *                 description: Whether plate waiting experience is present.
 *               retailCashier:
 *                 type: boolean
 *                 description: Whether retail cashier experience is present.
 *               barWork:
 *                 type: boolean
 *                 description: Whether bar work experience is present.
 *               hospitality:
 *                 type: boolean
 *                 description: Whether hospitality experience is present.
 *               foodService:
 *                 type: boolean
 *                 description: Whether food service experience is present.
 *               barista:
 *                 type: boolean
 *                 description: Whether barista experience is present.
 *               supervising:
 *                 type: boolean
 *                 description: Whether supervising experience is present.
 *               level2FoodHygieneCertificate:
 *                 type: string
 *                 description: The level 2 food hygiene certificate.
 *               level2FoodHygieneCertificateUpload:
 *                 type: string
 *                 format: binary
 *                 description: The upload file for the level 2 food hygiene certificate.
 *               personalLicenseHolder:
 *                 type: boolean
 *                 description: Whether the applicant is a personal license holder.
 *               personalLicenseCertificateUpload:
 *                 type: string
 *                 format: binary
 *                 description: The upload file for the personal license certificate.
 *               dbsDisclosureAndBarringService:
 *                 type: boolean
 *                 description: Whether DBS (Disclosure and Barring Service) is passed.
 *               dbsCertificateUpload:
 *                 type: string
 *                 format: binary
 *                 description: The upload file for the DBS certificate.
 *             required:
 *               - applicationNo
 *               - plateWaiting
 *               - retailCashier
 *               - barWork
 *               - hospitality
 *               - foodService
 *               - barista
 *               - supervising
 *               - level2FoodHygieneCertificate
 *               - personalLicenseHolder
 *               - dbsDisclosureAndBarringService
 *     responses:
 *       201:
 *         description: Successfully created the General Info entry
 *       400:
 *         description: Bad request, required fields are missing or invalid
 *       500:
 *         description: Server error
 */

router.post('/', uploadDocumentsAndImages.fields([
    { name: 'level2FoodHygieneCertificateUpload', maxCount: 1 },
    { name: 'personalLicenseCertificateUpload', maxCount: 1 },
    { name: 'dbsCertificateUpload', maxCount: 1 },
]), GeneralInfoController.createOrUpdateGeneralInfo);





/**
 * @swagger
 * /general-info/{applicationNo}:
 *   get:
 *     summary: Retrieve general information by applicationNo
 *     description: Fetches general information associated with a given ID.
 *     tags: [GeneralInfo]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         required: true
 *         schema:
 *           type: string
 *         description: The applicationNo of the general information record to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the general information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The applicationNo of the record.
 *                 name:
 *                   type: string
 *                   description: The name of the entity.
 *                 description:
 *       400:
 *         description: Bad request. Invalid ID parameter.
 *       404:
 *         description: General information not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:applicationNo', GeneralInfoController.getGeneralInfoByNo);

// Route to update a GeneralInfo entry by ID
router.put('/:id', GeneralInfoController.updateGeneralInfoByNo);

// Route to delete a GeneralInfo entry by ID
router.delete('/:id', GeneralInfoController.deleteGeneralInfoByNo);

export default router;
