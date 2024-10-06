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
exports.ProfessionalDetailsController = void 0;
const ProfessionalDetailsService_1 = require("../services/ProfessionalDetailsService");
const UserService_1 = require("../services/UserService");
class ProfessionalDetailsController {
    // Create or update ProfessionalDetails
    static createProfessionalDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { applicationNo } = _a, professionalDetails = __rest(_a, ["applicationNo"]);
                // Validate applicationNo
                if (!applicationNo) {
                    return res.status(400).json({ statusCode: 400, message: 'Application number is required' });
                }
                const existingApplicant = yield UserService_1.UserService.findApplicationNo(applicationNo);
                if (!existingApplicant) {
                    return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
                }
                // Ensure professionalDetails is in the correct format
                if (typeof professionalDetails !== 'object' || Array.isArray(professionalDetails)) {
                    return res.status(400).json({ statusCode: 400, message: 'Invalid professional details format' });
                }
                // Process and save each entry in the professionalDetails
                const entries = Object.values(professionalDetails).filter(value => typeof value === 'object' && value !== null);
                if (entries.length === 0) {
                    return res.status(400).json({ statusCode: 400, message: 'No valid professional details provided' });
                }
                const updatedEntries = [];
                const newEntries = [];
                for (const entry of entries) {
                    if (entry && typeof entry === 'object') {
                        const { referenceContactPhone } = entry, restOfEntry = __rest(entry, ["referenceContactPhone"]);
                        if (!referenceContactPhone) {
                            return res.status(400).json({ statusCode: 400, message: 'Reference contact phone is required' });
                        }
                        const existingEntry = yield ProfessionalDetailsService_1.ProfessionalDetailsService.findByReferenceContactPhone(referenceContactPhone);
                        if (existingEntry) {
                            // Update existing entry
                            yield ProfessionalDetailsService_1.ProfessionalDetailsService.update(existingEntry.id, Object.assign(Object.assign({}, restOfEntry), { applicationNo }));
                            updatedEntries.push(Object.assign(Object.assign({}, existingEntry), restOfEntry));
                        }
                        else {
                            // Create new entry
                            const newEntry = yield ProfessionalDetailsService_1.ProfessionalDetailsService.create(Object.assign({ applicationNo }, entry));
                            newEntries.push(newEntry);
                        }
                    }
                }
                return res.status(201).json({
                    message: 'Professional details processed',
                    data: { updatedEntries, newEntries }
                });
            }
            catch (error) {
                console.error('Error creating or updating professional details:', error);
                res.status(500).json({ message: 'Error creating or updating professional details', error: error.message });
            }
        });
    }
    // Get ProfessionalDetails by applicationNo
    static getProfessionalDetailsByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const entry = yield ProfessionalDetailsService_1.ProfessionalDetailsService.getByApplicationNo(applicationNo);
                if (!entry) {
                    return res.status(404).send({ message: 'Professional details not found' });
                }
                res.status(200).send(entry);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching professional details', error: error.message });
            }
        });
    }
    // Update ProfessionalDetails by applicationNo
    static updateProfessionalDetailsByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const updatedEntry = yield ProfessionalDetailsService_1.ProfessionalDetailsService.updateByApplicationNo(applicationNo, req.body);
                if (!updatedEntry) {
                    return res.status(404).send({ message: 'Professional details not found' });
                }
                res.status(200).send(updatedEntry);
            }
            catch (error) {
                res.status(400).send({ message: 'Error updating professional details', error: error.message });
            }
        });
    }
    // Delete ProfessionalDetails by applicationNo
    static deleteProfessionalDetailsByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const message = yield ProfessionalDetailsService_1.ProfessionalDetailsService.deleteByApplicationNo(applicationNo);
                res.status(200).send({ message });
            }
            catch (error) {
                res.status(404).send({ message: error.message });
            }
        });
    }
}
exports.ProfessionalDetailsController = ProfessionalDetailsController;
