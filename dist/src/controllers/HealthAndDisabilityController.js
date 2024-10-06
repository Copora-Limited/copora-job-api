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
exports.HealthAndDisabilityController = void 0;
const HealthAndDisabilityService_1 = require("../services/HealthAndDisabilityService");
class HealthAndDisabilityController {
    // Create or update a HealthAndDisability entry
    static createHealthAndDisability(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.body;
                // Check if the HealthAndDisability with the given applicationNo exists
                const existingEntry = yield HealthAndDisabilityService_1.HealthAndDisabilityService.getByApplicationNo(applicationNo);
                if (existingEntry) {
                    // If it exists, update the existing record
                    const updatedEntry = yield HealthAndDisabilityService_1.HealthAndDisabilityService.updateByApplicationNo(applicationNo, req.body);
                    return res.status(200).send({ message: 'Health and Disability entry updated', data: updatedEntry });
                }
                else {
                    // If it does not exist, create a new record
                    const newEntry = yield HealthAndDisabilityService_1.HealthAndDisabilityService.create(req.body);
                    return res.status(201).send({ message: 'Health and Disability entry created', data: newEntry });
                }
            }
            catch (error) {
                res.status(500).send({ message: 'Error creating or updating Health and Disability entry', error: error.message });
            }
        });
    }
    // Get HealthAndDisability entry by applicationNo
    static getHealthAndDisabilityByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const entry = yield HealthAndDisabilityService_1.HealthAndDisabilityService.getByApplicationNo(applicationNo);
                if (!entry) {
                    return res.status(404).send({ message: 'Health and Disability entry not found' });
                }
                res.status(200).send(entry);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching Health and Disability entry', error: error.message });
            }
        });
    }
    // Update HealthAndDisability entry by applicationNo
    static updateHealthAndDisabilityByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const updatedEntry = yield HealthAndDisabilityService_1.HealthAndDisabilityService.updateByApplicationNo(applicationNo, req.body);
                if (!updatedEntry) {
                    return res.status(404).send({ message: 'Health and Disability entry not found' });
                }
                res.status(200).send(updatedEntry);
            }
            catch (error) {
                res.status(400).send({ message: 'Error updating Health and Disability entry', error: error.message });
            }
        });
    }
    // Delete HealthAndDisability entry by applicationNo
    static deleteHealthAndDisabilityByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const message = yield HealthAndDisabilityService_1.HealthAndDisabilityService.deleteByApplicationNo(applicationNo);
                res.status(200).send({ message });
            }
            catch (error) {
                res.status(404).send({ message: error.message });
            }
        });
    }
}
exports.HealthAndDisabilityController = HealthAndDisabilityController;
