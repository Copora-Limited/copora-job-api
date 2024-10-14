import { Router } from 'express';
import { JobTitleController } from '../controllers/JobTitleController';

/**
 * @swagger
 * tags:
 *   name: Job Titles
 *   description: API for managing job titles
 */
const router = Router();

/**
 * @swagger
 * /api/job-titles:
 *   get:
 *     summary: Retrieve a list of job titles
 *     tags: [Job Titles]
 *     responses:
 *       200:
 *         description: A list of job titles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobTitle'
 */
router.get('/', JobTitleController.getAll);

/**
 * @swagger
 * /api/job-titles/{id}:
 *   get:
 *     summary: Get a job title by ID
 *     tags: [Job Titles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the job title to retrieve
 *     responses:
 *       200:
 *         description: A job title object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobTitle'
 *       404:
 *         description: Job title not found
 */
router.get('/:id', JobTitleController.getById);

/**
 * @swagger
 * /api/job-titles:
 *   get:
 *     summary: Get all job titles
 *     tags: [Job Titles]
 *     responses:
 *       200:
 *         description: A list of job titles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobTitle'
 *
 *   post:
 *     summary: Create new job titles
 *     tags: [Job Titles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - name
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the job title
 *               example:
 *                 - name: "Hotel Manager"
 *                 - name: "Assistant Hotel Manager"
 *                 - name: "Hotel Receptionist"
 *                 - name: "Concierge"
 *                 - name: "Reservation Agent"
 *                 - name: "Front of House Manager"
 *                 - name: "Hotel General Manager"
 *                 - name: "Operations Manager"
 *     responses:
 *       201:
 *         description: The created job titles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - name
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the job title
 *                 example:
 *                   name: "Hotel Manager"
 *       400:
 *         description: Invalid input
 */


router.post('/', JobTitleController.create);

/**
 * @swagger
 * /api/job-titles/{id}:
 *   put:
 *     summary: Update a job title
 *     tags: [Job Titles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the job title to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobTitle'
 *     responses:
 *       200:
 *         description: The updated job title
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobTitle'
 *       404:
 *         description: Job title not found
 */
router.put('/:id', JobTitleController.update);

/**
 * @swagger
 * /api/job-titles/{id}:
 *   delete:
 *     summary: Delete a job title
 *     tags: [Job Titles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the job title to delete
 *     responses:
 *       204:
 *         description: Job title deleted successfully
 *       404:
 *         description: Job title not found
 */
router.delete('/:id', JobTitleController.delete);

export default router;
