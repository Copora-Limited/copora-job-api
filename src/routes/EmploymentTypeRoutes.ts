import { Router } from 'express';
import { EmploymentTypeController } from '../controllers/EmploymentTypeController';

/**
 * @swagger
 * tags:
 *   name: EmploymentTypes
 *   description: API for managing employment types
 */
const router = Router();
// const employmentTypeController = new EmploymentTypeController();

/**
 * @swagger
 * /api/employment-types:
 *   get:
 *     summary: Retrieve a list of employment types
 *     tags: [EmploymentTypes]
 *     responses:
 *       200:
 *         description: A list of employment types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmploymentType'
 */
router.get('/', EmploymentTypeController.getAll);

/**
 * @swagger
 * /api/employment-types/{id}:
 *   get:
 *     summary: Get an employment type by ID
 *     tags: [EmploymentTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the employment type to retrieve
 *     responses:
 *       200:
 *         description: An employment type object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmploymentType'
 *       404:
 *         description: Employment type not found
 */
router.get('/:id', EmploymentTypeController.getById);

/**
 * @swagger
 * components:
 *   schemas:
 *     EmploymentType:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the employment type
 *       example:
 *         name: "Full-time"
 *
 * /api/employment-types:
 *   get:
 *     summary: Get all employment types
 *     tags: [EmploymentTypes]
 *     responses:
 *       200:
 *         description: A list of employment types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmploymentType'
 *
 *   post:
 *     summary: Create a new employment type
 *     tags: [EmploymentTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the employment type
 *     responses:
 *       201:
 *         description: The created employment type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the employment type
 *       400:
 *         description: Invalid input
 */

router.post('/', EmploymentTypeController.create);


/**
 * @swagger
 * /api/employment-types/{id}:
 *   put:
 *     summary: Update an employment type
 *     tags: [EmploymentTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the employment type to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmploymentType'
 *     responses:
 *       200:
 *         description: The updated employment type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmploymentType'
 *       404:
 *         description: Employment type not found
 */
router.put('/:id', EmploymentTypeController.update);

/**
 * @swagger
 * /api/employment-types/{id}:
 *   delete:
 *     summary: Delete an employment type
 *     tags: [EmploymentTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the employment type to delete
 *     responses:
 *       204:
 *         description: Employment type deleted successfully
 *       404:
 *         description: Employment type not found
 */
router.delete('/:id', EmploymentTypeController.delete);

export default router;
