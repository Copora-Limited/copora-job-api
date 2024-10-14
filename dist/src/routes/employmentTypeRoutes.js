"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmploymentTypeController_1 = require("../controllers/EmploymentTypeController");
const router = (0, express_1.Router)();
const employmentTypeController = new EmploymentTypeController_1.EmploymentTypeController();
router.get('/', employmentTypeController.getAll.bind(employmentTypeController));
router.get('/:id', employmentTypeController.getById.bind(employmentTypeController));
router.post('/', employmentTypeController.create.bind(employmentTypeController));
router.put('/:id', employmentTypeController.update.bind(employmentTypeController));
router.delete('/:id', employmentTypeController.delete.bind(employmentTypeController));
exports.default = router;
