"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const JobListingController_1 = require("../controllers/JobListingController");
const router = (0, express_1.Router)();
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
 *
 */
router.get('/', JobListingController_1.JobListingController.getAll);
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
 *
 *       404:
 *         description: Job listing not found
 */
router.get('/:id', JobListingController_1.JobListingController.getById);
/**
 * @swagger
 * /api/job-listings:
 *   post:
 *     summary: Create a job listing
 *     tags: [Job Listings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationNo:
 *                 type: string
 *               jobTitle:
 *                 type: string
 *               employmentType:
 *                 type: string
 *               location:
 *                 type: string
 *               group:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job listing created
 *       400:
 *         description: Invalid input
 */
router.post('/', JobListingController_1.JobListingController.create);
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
 *
 *     responses:
 *       200:
 *         description: The updated job listing
 *       404:
 *         description: Job listing not found
 *       500:
 *         description: Server error
 */
router.put('/:id', JobListingController_1.JobListingController.update);
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
router.delete('/:id', JobListingController_1.JobListingController.delete);
exports.default = router;
