import { Router } from 'express';
import { GeneralInfoController } from '../controllers/GeneralInfoController';
import uploadDocumentsAndImages from '../multerConfig';

const router = Router();

// Route to create a new GeneralInfo entry


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
router.get('/:id', GeneralInfoController.getGeneralInfoByNo);

// Route to update a GeneralInfo entry by ID
router.put('/:id', GeneralInfoController.updateGeneralInfoByNo);

// Route to delete a GeneralInfo entry by ID
router.delete('/:id', GeneralInfoController.deleteGeneralInfoByNo);

export default router;
