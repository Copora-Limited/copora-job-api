"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmploymentTypeController = void 0;
const EmploymentTypeService_1 = require("../services/EmploymentTypeService");
class EmploymentTypeController {
    // Create or update employment type based on id
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employmentTypesData = req.body; // Expecting an array of employment type data
                const newEmploymentTypes = [];
                for (const employmentTypeData of employmentTypesData) {
                    // Check if the employment type already exists by name (or any other criteria you prefer)
                    const existingEmploymentType = yield EmploymentTypeService_1.EmploymentTypeService.getByName(employmentTypeData.name);
                    if (existingEmploymentType) {
                        // If it exists, throw an error
                        throw new Error(`Record already exists for employment type: ${employmentTypeData.name}`);
                    }
                    // If it doesn't exist, create a new one
                    const newEmploymentType = yield EmploymentTypeService_1.EmploymentTypeService.create(employmentTypeData);
                    newEmploymentTypes.push(newEmploymentType);
                }
                res.status(201).json({ message: "Created Successfully", data: newEmploymentTypes });
            }
            catch (error) {
                res.status(400).json({ message: 'Error creating employment types', error: error.message });
            }
        });
    }
    // Get all Employment Types
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employmentTypes = yield EmploymentTypeService_1.EmploymentTypeService.getAll();
                res.status(200).json(employmentTypes);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching employment types', error: error.message });
            }
        });
    }
    // Get Employment Type by ID
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Convert id to a number
                const numericId = parseInt(id, 10);
                // Check if the id is a valid number
                if (isNaN(numericId)) {
                    return res.status(400).json({ message: 'Invalid ID format' });
                }
                const employmentType = yield EmploymentTypeService_1.EmploymentTypeService.getById(numericId);
                if (!employmentType) {
                    return res.status(404).send({ message: 'Employment Type not found' });
                }
                res.status(200).send(employmentType);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching employment type', error: error.message });
            }
        });
    }
    // Update Employment Type by ID
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Convert id to a number
                const numericId = parseInt(id, 10);
                // Check if the id is a valid number
                if (isNaN(numericId)) {
                    return res.status(400).json({ message: 'Invalid ID format' });
                }
                const updatedEmploymentType = yield EmploymentTypeService_1.EmploymentTypeService.update(numericId, req.body);
                if (!updatedEmploymentType) {
                    return res.status(404).send({ message: 'Employment Type not found' });
                }
                res.status(200).send(updatedEmploymentType);
            }
            catch (error) {
                res.status(400).send({ message: 'Error updating employment type', error: error.message });
            }
        });
    }
    // Delete Employment Type by ID
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Convert id to a number
                const numericId = parseInt(id, 10);
                // Check if the id is a valid number
                if (isNaN(numericId)) {
                    return res.status(400).json({ message: 'Invalid ID format' });
                }
                const message = yield EmploymentTypeService_1.EmploymentTypeService.delete(numericId);
                res.status(200).send({ message });
            }
            catch (error) {
                res.status(404).send({ message: error.message });
            }
        });
    }
}
exports.EmploymentTypeController = EmploymentTypeController;
