import { Router } from 'express';
import { JobListingController } from '../controllers/JobListingController';

const router = Router();

/**
 * @swagger
 * /api/job-listings:
 *   get:
 *     summary: Retrieve a list of job listings
 *     tags: [Job Listings]
 *     responses:
 *       200:
 *         description: A list of job listings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobListing'
 */
router.get('/', JobListingController.getAll);

/**
 * @swagger
 * /api/job-listings/{id}:
 *   get:
 *     summary: Retrieve a job listing by ID
 *     tags: [Job Listings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The job listing ID
 *     responses:
 *       200:
 *         description: The job listing details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobListing'
 *       404:
 *         description: Job listing not found
 */
router.get('/:id', JobListingController.getById);

/**
 * @swagger
 * /api/job-listings:
 *   post:
 *     summary: Create a new job listing
 *     tags: [Job Listings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobListing'
 *     responses:
 *       201:
 *         description: The job listing was successfully created
 *       500:
 *         description: Server error
 */
router.post('/', JobListingController.create);

/**
 * @swagger
 * /api/job-listings/{id}:
 *   put:
 *     summary: Update a job listing
 *     tags: [Job Listings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The job listing ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobListing'
 *     responses:
 *       200:
 *         description: The updated job listing
 *       404:
 *         description: Job listing not found
 *       500:
 *         description: Server error
 */
router.put('/:id', JobListingController.update);

/**
 * @swagger
 * /api/job-listings/{id}:
 *   delete:
 *     summary: Delete a job listing
 *     tags: [Job Listings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The job listing ID
 *     responses:
 *       204:
 *         description: The job listing was successfully deleted
 *       404:
 *         description: Job listing not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', JobListingController.delete);

export default router;
