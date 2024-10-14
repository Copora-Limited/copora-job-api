import { Router } from 'express';
import { JobTitleController } from '../controllers/JobTitleController';

/**
 * @swagger
 * tags:
 *   name: Job Titles
 *   description: API for managing job titles
 */
const router = Router();
// const jobTitleController = new JobTitleController();

/**
 * @swagger
 * /api/jobTitles:
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
 * /api/jobTitles/{id}:
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
 * /api/jobTitles:
 *   post:
 *     summary: Create a new job title
 *     tags: [Job Titles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobTitle'
 *     responses:
 *       201:
 *         description: The created job title
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobTitle'
 */
router.post('/', JobTitleController.create);

/**
 * @swagger
 * /api/jobTitles/{id}:
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
 * /api/jobTitles/{id}:
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
