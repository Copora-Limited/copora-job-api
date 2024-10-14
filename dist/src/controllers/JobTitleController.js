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
exports.JobTitleController = void 0;
const JobTitleService_1 = require("../services/JobTitleService");
class JobTitleController {
    // Create a new Job Title
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobTitlesData = req.body; // Expecting an array of job title data
                const newJobTitles = [];
                for (const jobTitleData of jobTitlesData) {
                    // Check if the job title already exists by name
                    const existingJobTitle = yield JobTitleService_1.JobTitleService.getByName(jobTitleData.name);
                    if (existingJobTitle) {
                        // If it exists, throw an error
                        throw new Error(`Record already exists for job title: ${jobTitleData.name}`);
                    }
                    // If it doesn't exist, create a new one
                    const newJobTitle = yield JobTitleService_1.JobTitleService.create(jobTitleData);
                    newJobTitles.push(newJobTitle);
                }
                res.status(201).json(newJobTitles); // Return the newly created job titles
            }
            catch (error) {
                res.status(400).send({ message: 'Error creating job titles', error: error.message });
            }
        });
    }
    // Get all Job Titles
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobTitles = yield JobTitleService_1.JobTitleService.getAll();
                res.status(200).json(jobTitles);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching job titles', error: error.message });
            }
        });
    }
    // Get Job Title by ID
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const numericId = parseInt(id, 10);
                // Check if the id is a valid number
                if (isNaN(numericId)) {
                    return res.status(400).json({ message: 'Invalid ID format' });
                }
                const jobTitle = yield JobTitleService_1.JobTitleService.getById(numericId);
                if (!jobTitle) {
                    return res.status(404).send({ message: 'Job Title not found' });
                }
                res.status(200).send(jobTitle);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching job title', error: error.message });
            }
        });
    }
    // Update Job Title by ID
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const numericId = parseInt(id, 10);
                // Check if the id is a valid number
                if (isNaN(numericId)) {
                    return res.status(400).json({ message: 'Invalid ID format' });
                }
                const updatedJobTitle = yield JobTitleService_1.JobTitleService.update(numericId, req.body);
                if (!updatedJobTitle) {
                    return res.status(404).send({ message: 'Job Title not found' });
                }
                res.status(200).send(updatedJobTitle);
            }
            catch (error) {
                res.status(400).send({ message: 'Error updating job title', error: error.message });
            }
        });
    }
    // Delete Job Title by ID
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const numericId = parseInt(id, 10);
                // Check if the id is a valid number
                if (isNaN(numericId)) {
                    return res.status(400).json({ message: 'Invalid ID format' });
                }
                yield JobTitleService_1.JobTitleService.delete(numericId);
                res.status(204).send(); // No content
            }
            catch (error) {
                res.status(404).send({ message: 'Job Title not found', error: error.message });
            }
        });
    }
}
exports.JobTitleController = JobTitleController;
