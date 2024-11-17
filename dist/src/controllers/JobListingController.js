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
exports.JobListingController = void 0;
const JobListingService_1 = require("../services/JobListingService");
const UserService_1 = require("../services/UserService");
const constants_1 = require("../constants");
class JobListingController {
    // Create a new Job Title
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { applicationNo } = req.body;
            try {
                // Check if the applicant exists
                const existingApplicant = yield UserService_1.UserService.findApplicationNo(applicationNo);
                if (!existingApplicant) {
                    res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
                    return;
                }
                // Check if the applicant has an existing entry in JobListings
                // const existingEntry = await JobListingService.findByApplicationNo(applicationNo);
                // if (existingEntry) {
                //     // If the entry already exists, update the job listing or onboarding status
                //     const updatedJobList = await JobListingService.update(existingEntry.id, req.body);
                //     await UserService.updateOnboardingStatus(applicationNo, OnboardingStatus.Approved);  // Update the applicant's onboarding status
                //     res.status(200).json({ message: 'Job listing updated and applicant status approved', updatedJobList });
                //     return;
                // }
                // If no existing entry found, create a new job listing
                const jobListingData = req.body;
                const newJobList = yield JobListingService_1.JobListingService.create(jobListingData);
                // After creating the job listing, update the user's onboarding status
                yield UserService_1.UserService.updateOnboardingStatus(applicationNo, constants_1.OnboardingStatus.Approved);
                res.status(201).json({ message: 'New job listing created and applicant status approved', newJobList });
            }
            catch (error) {
                res.status(400).send({ message: 'Error processing request', error: error.message });
            }
        });
    }
    // Get all Job Titles
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobListing = yield JobListingService_1.JobListingService.getAll();
                res.status(200).json(jobListing);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching job titles', error: error.message });
            }
        });
    }
    static getAllTags(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tags = yield JobListingService_1.JobListingService.getAllTags();
                res.status(200).json(tags); // Return the result as JSON
            }
            catch (error) {
                console.error('Error retrieving all tags:', error);
                res.status(500).json({ message: 'Server error', error: error.message });
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
                const jobList = yield JobListingService_1.JobListingService.getById(numericId);
                if (!jobList) {
                    return res.status(404).send({ message: 'Job Title not found' });
                }
                res.status(200).send(jobList);
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
                const updatedJobList = yield JobListingService_1.JobListingService.update(numericId, req.body);
                if (!updatedJobList) {
                    return res.status(404).send({ message: 'Job Title not found' });
                }
                res.status(200).send(updatedJobList);
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
                yield JobListingService_1.JobListingService.delete(numericId);
                res.status(204).send(); // No content
            }
            catch (error) {
                res.status(404).send({ message: 'Job Title not found', error: error.message });
            }
        });
    }
}
exports.JobListingController = JobListingController;
