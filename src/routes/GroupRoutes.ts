import { Router } from 'express';
import { GroupController } from '../controllers/GroupController';

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: API for managing groups
 */
const router = Router();
const groupController = new GroupController();

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Retrieve a list of groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: A list of groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 */
router.get('/', groupController.getAll.bind(groupController));

/**
 * @swagger
 * /api/groups/{id}:
 *   get:
 *     summary: Get a group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the group to retrieve
 *     responses:
 *       200:
 *         description: A group object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Group not found
 */
router.get('/:id', groupController.getById.bind(groupController));

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: The created group
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 */
router.post('/', groupController.create.bind(groupController));

/**
 * @swagger
 * /api/groups/{id}:
 *   put:
 *     summary: Update a group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the group to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: The updated group
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Group not found
 */
router.put('/:id', groupController.update.bind(groupController));

/**
 * @swagger
 * /api/groups/{id}:
 *   delete:
 *     summary: Delete a group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the group to delete
 *     responses:
 *       204:
 *         description: Group deleted successfully
 *       404:
 *         description: Group not found
 */
router.delete('/:id', groupController.delete.bind(groupController));

export default router;
