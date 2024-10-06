"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { getSuggestions } from '../controllers/searchController';
const router = (0, express_1.Router)();
// /**
//  * @swagger
//  * /search/suggestions:
//  *   get:
//  *     summary: Get search suggestions based on a query string
//  *     tags: [Search]
//  *     parameters:
//  *       - in: query
//  *         name: query
//  *         required: true
//  *         schema:
//  *           type: string
//  *           example: "example"
//  *     responses:
//  *       200:
//  *         description: Successful response with search suggestions
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: string
//  *       400:
//  *         description: Invalid query parameter
//  *       500:
//  *         description: Internal server error
//  */
// router.get('/suggestions', getSuggestions);
exports.default = router;
