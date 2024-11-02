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
exports.ReferenceController = void 0;
const ReferenceService_1 = require("../services/ReferenceService");
const UserService_1 = require("../services/UserService");
class ReferenceController {
    // Create or update Reference
    static createOrUpdateReferences(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { applicationNo } = _a, references = __rest(_a, ["applicationNo"]);
                // Validate applicationNo
                if (!applicationNo) {
                    return res.status(400).json({ statusCode: 400, message: 'Application number is required' });
                }
                // Check if the applicant exists
                const existingApplicant = yield UserService_1.UserService.findApplicationNo(applicationNo);
                if (!existingApplicant) {
                    return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
                }
                // Ensure references are in the correct format
                if (typeof references !== 'object' || Array.isArray(references)) {
                    return res.status(400).json({ statusCode: 400, message: 'Invalid references format' });
                }
                // Process and validate each reference entry
                const entries = Object.values(references).filter(value => typeof value === 'object' && value !== null);
                if (entries.length === 0) {
                    return res.status(400).json({ statusCode: 400, message: 'No valid reference entries provided' });
                }
                const updatedEntries = [];
                const newEntries = [];
                for (const [index, entry] of entries.entries()) {
                    if (entry && typeof entry === 'object') {
                        const { employerName, jobTitle, contactName, phone, email, startDate, endDate, address, responsibilities } = entry, restOfEntry = __rest(entry, ["employerName", "jobTitle", "contactName", "phone", "email", "startDate", "endDate", "address", "responsibilities"]);
                        // Validate required fields with index in the error message
                        if (!employerName || employerName.trim() === "") {
                            return res.status(400).json({ statusCode: 400, message: `At form Row ${index + 1}: Enter employer/company name (e.g., ABC Company Limited) or "NA" if not applicable` });
                        }
                        if (!jobTitle || jobTitle.trim() === "") {
                            return res.status(400).json({ statusCode: 400, message: `At form Row ${index + 1}: Enter Job title or "NA" if not applicable` });
                        }
                        if (!contactName || contactName.trim() === "") {
                            return res.status(400).json({ statusCode: 400, message: `At form Row ${index + 1}: Enter Contact Name (e.g., John Doe)` });
                        }
                        if (!phone || phone.trim() === "") {
                            return res.status(400).json({ statusCode: 400, message: `At form Row ${index + 1}: Enter Phone Number (e.g., +44 123 456 7890)` });
                        }
                        if (!email || email.trim() === "") {
                            return res.status(400).json({ statusCode: 400, message: `At form Row ${index + 1}: Enter Email (e.g., example@mail.com)` });
                        }
                        if (!/\S+@\S+\.\S+/.test(email)) {
                            return res.status(400).json({ statusCode: 400, message: `At form Row ${index + 1}: Enter a valid email address` });
                        }
                        if (!startDate || startDate.trim() === "") {
                            return res.status(400).json({ statusCode: 400, message: `At form Row ${index + 1}: Enter Start Date (DD/MM/YYYY) or select today's date if not applicable` });
                        }
                        if (!endDate || endDate.trim() === "") {
                            return res.status(400).json({ statusCode: 400, message: `At form Row ${index + 1}: Enter End Date (DD/MM/YYYY) or select today's date if not applicable` });
                        }
                        if (!address || address.trim() === "") {
                            return res.status(400).json({ statusCode: 400, message: `At form Row ${index + 1}: Enter Address or enter "NA" if not applicable` });
                        }
                        if (!responsibilities || responsibilities.trim() === "") {
                            return res.status(400).json({ statusCode: 400, message: `At form Row ${index + 1}: Enter Responsibilities or enter "NA" if not applicable` });
                        }
                        // Ensure startDate is not greater than endDate
                        if (new Date(startDate) > new Date(endDate)) {
                            return res.status(400).json({ statusCode: 400, message: `At form Row ${index + 1}: Start Date cannot be later than End Date` });
                        }
                        // Check for existing reference by phone
                        const existingReference = yield ReferenceService_1.ReferenceService.findByApplicationNoAndPhone(applicationNo, phone, email);
                        if (existingReference) {
                            // Update existing reference with attempted: true
                            yield ReferenceService_1.ReferenceService.update(existingReference.id, Object.assign(Object.assign({}, restOfEntry), { attempted: true, applicationNo }));
                            updatedEntries.push(Object.assign(Object.assign(Object.assign({}, existingReference), restOfEntry), { attempted: true }));
                        }
                        else {
                            // Create new reference with attempted: true
                            const newReference = yield ReferenceService_1.ReferenceService.create(Object.assign({ applicationNo, attempted: true }, entry));
                            newEntries.push(newReference);
                        }
                    }
                }
                return res.status(200).json({
                    message: 'Reference details processed successfully',
                    data: { updatedEntries, newEntries }
                });
            }
            catch (error) {
                console.error('Error creating or updating reference details:', error);
                res.status(500).json({ message: 'Error creating or updating reference details', error: error.message });
            }
        });
    }
    // Get Reference by applicationNo
    static getReferenceByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const reference = yield ReferenceService_1.ReferenceService.getAllByApplicationNo(applicationNo);
                // If no reference is found, return an empty array with a 200 status
                if (!reference) {
                    return res.status(200).send([]);
                }
                res.status(200).send(reference);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching reference', error: error.message });
            }
        });
    }
    // Update Reference by applicationNo
    static updateReferenceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedReference = yield ReferenceService_1.ReferenceService.update(Number(id), req.body);
                if (!updatedReference) {
                    return res.status(404).send({ message: 'Reference not found' });
                }
                res.status(200).send({ message: 'Reference updated successfully', data: updatedReference });
            }
            catch (error) {
                res.status(400).send({ message: 'Error updating reference', error: error.message });
            }
        });
    }
    // Delete Reference by applicationNo
    static deleteReferenceByNoAndId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo, id } = req.params; // Extract applicationNo and id from request params
                const message = yield ReferenceService_1.ReferenceService.deleteByApplicationNoAndId(applicationNo, parseInt(id));
                res.status(200).send({ message });
            }
            catch (error) {
                res.status(404).send({ message: error.message });
            }
        });
    }
}
exports.ReferenceController = ReferenceController;
