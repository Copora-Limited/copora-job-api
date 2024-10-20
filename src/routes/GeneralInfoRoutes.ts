import { Router } from 'express';
import { GeneralInfoController } from '../controllers/GeneralInfoController';

const router = Router();
const generalInfoController = new GeneralInfoController();

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The auto-generated id of the created General Info entry.
 *                 applicationNo:
 *                   type: string
 *                   description: The application number.
 *                 plateWaiting:
 *                   type: boolean
 *                   description: Whether plate waiting experience is present.
 *                 retailCashier:
 *                   type: boolean
 *                   description: Whether retail cashier experience is present.
 *                 barWork:
 *                   type: boolean
 *                   description: Whether bar work experience is present.
 *                 hospitality:
 *                   type: boolean
 *                   description: Whether hospitality experience is present.
 *                 foodService:
 *                   type: boolean
 *                   description: Whether food service experience is present.
 *                 barista:
 *                   type: boolean
 *                   description: Whether barista experience is present.
 *                 supervising:
 *                   type: boolean
 *                   description: Whether supervising experience is present.
 *                 level2FoodHygieneCertificate:
 *                   type: string
 *                   description: The level 2 food hygiene certificate.
 *                 level2FoodHygieneCertificateUpload:
 *                   type: string
 *                   format: binary
 *                   description: The upload file for the level 2 food hygiene certificate.
 *                 personalLicenseHolder:
 *                   type: boolean
 *                   description: Whether the applicant is a personal license holder.
 *                 personalLicenseCertificateUpload:
 *                   type: string
 *                   format: binary
 *                   description: The upload file for the personal license certificate.
 *                 dbsDisclosureAndBarringService:
 *                   type: boolean
 *                   description: Whether DBS (Disclosure and Barring Service) is passed.
 *                 dbsCertificateUpload:
 *                   type: string
 *                   format: binary
 *                   description: The upload file for the DBS certificate.
 *       400:
 *         description: Bad request, required fields are missing or invalid
 *       500:
 *         description: Server error
 */
router.post('/', GeneralInfoController.createOrUpdateGeneralInfo);


// Route to get a specific GeneralInfo entry by ID
router.get('/:id', GeneralInfoController.getGeneralInfoByNo);

// Route to update a GeneralInfo entry by ID
router.put('/:id', GeneralInfoController.updateGeneralInfoByNo);

// Route to delete a GeneralInfo entry by ID
router.delete('/:id', GeneralInfoController.deleteGeneralInfoByNo);

export default router;
