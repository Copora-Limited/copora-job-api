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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthAndDisabilityController = void 0;
const HealthAndDisabilityService_1 = require("../services/HealthAndDisabilityService");
class HealthAndDisabilityController {
    // Create or update a HealthAndDisability entry
    static createHealthAndDisability(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { applicationNo, gpName, gpAddress, relevantHealthIssues, relevantHealthIssuesDetails } = _a, otherFields = __rest(_a, ["applicationNo", "gpName", "gpAddress", "relevantHealthIssues", "relevantHealthIssuesDetails"]);
                // Validate applicationNo
                if (!applicationNo) {
                    return res.status(400).json({ statusCode: 400, message: 'Application number is required' });
                }
                // Validate required fields
                if (!gpName) {
                    return res.status(400).json({ statusCode: 400, message: 'GP Name (Doctor) is required' });
                }
                if (!gpAddress) {
                    return res.status(400).json({ statusCode: 400, message: 'GP Address is required' });
                }
                if (!otherFields.relevantHealthIssues && !otherFields.majorIllnessTreatment && !otherFields.healthRelatedAbsences && !otherFields.currentMedications) {
                    return res.status(400).json({ statusCode: 400, message: 'Enter Health Issue is required' });
                }
                // Check if the user specified details when relevantHealthIssues is true
                // if (relevantHealthIssues && !relevantHealthIssuesDetails) {
                //     return res.status(400).json({ statusCode: 400, message: 'Please provide details about the relevant health issues.' });
                // }
                // Check if the user specified details when majorIllnessTreatment is true
                // if (otherFields.majorIllnessTreatment && !otherFields.majorIllnessDetails) {
                //     return res.status(400).json({ statusCode: 400, message: 'Please provide details about major illness treatment.' });
                // }
                // // Check if the user specified details when healthRelatedAbsences is true
                // if (otherFields.healthRelatedAbsences && !otherFields.healthRelatedAbsencesDetails) {
                //     return res.status(400).json({ statusCode: 400, message: 'Please provide details about health-related absences.' });
                // }
                // // Check if the user specified details when currentMedications is true
                // if (otherFields.currentMedications && !otherFields.medicationDetails) {
                //     return res.status(400).json({ statusCode: 400, message: 'Please provide details about current medications.' });
                // }
                // Check if the HealthAndDisability with the given applicationNo exists
                const existingEntry = yield HealthAndDisabilityService_1.HealthAndDisabilityService.getByApplicationNo(applicationNo);
                // Add attempted: true to the data being saved
                const dataToSave = Object.assign(Object.assign({ gpName,
                    gpAddress,
                    relevantHealthIssues,
                    relevantHealthIssuesDetails }, otherFields), { applicationNo, attempted: true });
                if (existingEntry) {
                    // If it exists, update the existing record
                    const updatedEntry = yield HealthAndDisabilityService_1.HealthAndDisabilityService.updateByApplicationNo(applicationNo, dataToSave);
                    return res.status(200).send({ message: 'Health and Disability entry updated', data: updatedEntry });
                }
                else {
                    // If it does not exist, create a new record
                    const newEntry = yield HealthAndDisabilityService_1.HealthAndDisabilityService.create(dataToSave);
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
                    // return res.status(404).send({ message: 'Health and Disability entry not found' });
                    return res.status(200).send([]);
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
