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
exports.AgreementToReportInfectionController = void 0;
const HealthAndDisabilityService_1 = require("../services/HealthAndDisabilityService");
class AgreementToReportInfectionController {
    // Create or update a HealthAndDisability entry
    static updateOrCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo, agreementToReportInfection } = req.body;
                // Check if applicationNo is provided
                if (!applicationNo) {
                    return res.status(400).json({ statusCode: 400, message: 'Application number is required.' });
                }
                if (!agreementToReportInfection || agreementToReportInfection === null) {
                    return res.status(400).json({ statusCode: 400, message: 'Please certify the agreement before you proceed' });
                }
                // Check if the HealthAndDisability with the given applicationNo exists
                const existingEntry = yield HealthAndDisabilityService_1.HealthAndDisabilityService.getByApplicationNo(applicationNo);
                const dataToSave = {
                    agreementToReportInfection,
                    attempted: true, // Set `attempted` to true
                };
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
}
exports.AgreementToReportInfectionController = AgreementToReportInfectionController;
