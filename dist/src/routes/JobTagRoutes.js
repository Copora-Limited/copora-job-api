"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const JobListingController_1 = require("../controllers/JobListingController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/tags:
 *   get:
 *     summary: Retrieve a list of all tags
 *     tags: [Job Tag]
 *     responses:
 *       200:
 *         description: A list of all tags
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 location:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Location'
 *                 group:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Group'
 *                 employmentType:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmploymentType'
 *                 jobTitle:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/jobTitle'
 *       500:
 *         description: Server error
 */
router.get('/api/tags', JobListingController_1.JobListingController.getAllTags);
exports.default = router;
