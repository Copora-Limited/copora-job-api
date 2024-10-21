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
exports.EducationalDetailsController = void 0;
const EducationalDetailsService_1 = require("../services/EducationalDetailsService");
const UserService_1 = require("../services/UserService");
class EducationalDetailsController {
    // private static educationalDetailsService = new EducationalDetailsService();
    // Create or update educational details based on applicationNo
    // static async createEducationalDetails(req: Request, res: Response) {
    //     try {
    //         const { applicationNo, ...educationalDetails } = req.body;
    //         // Validate applicationNo
    //         if (!applicationNo) {
    //             return res.status(400).json({ statusCode: 400, message: 'Application number is required' });
    //         }
    //         const existingApplicant = await UserService.findApplicationNo(applicationNo);
    //         if (!existingApplicant) {
    //             return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
    //         }
    //         // Process each entry
    //         const updatedEntries = [];
    //         const newEntries = [];
    //         for (const key in educationalDetails) {
    //             const entry = educationalDetails[key];
    //             if (entry && typeof entry === 'object') {
    //                 const { courseOfStudy, ...restOfEntry } = entry;
    //                 if (!courseOfStudy) {
    //                     return res.status(400).json({ statusCode: 400, message: 'Course of study is required' });
    //                 }
    //                 const existingEntry = await EducationalDetailsService.findByApplicationNoAndCourseOfStudy(applicationNo, courseOfStudy);
    //                 if (existingEntry) {
    //                     // Update existing entry
    //                     await EducationalDetailsService.update(existingEntry.id, {
    //                         ...restOfEntry,
    //                         applicationNo
    //                     });
    //                     updatedEntries.push({ ...existingEntry, ...restOfEntry });
    //                 } else {
    //                     // Create new entry
    //                     const newEntry = await EducationalDetailsService.create({
    //                         applicationNo,
    //                         ...entry
    //                     });
    //                     newEntries.push(newEntry);
    //                 }
    //             }
    //         }
    //         return res.status(201).json({
    //             message: 'Educational details processed',
    //             data: { updatedEntries, newEntries }
    //         });
    //     } catch (error) {
    //         console.error('Error creating or updating educational details:', error);
    //         return res.status(500).json({ message: 'Error creating or updating educational details', error: error.message });
    //     }
    // }
    static createEducationalDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { applicationNo } = _a, educationalDetails = __rest(_a, ["applicationNo"]);
                // Validate applicationNo
                if (!applicationNo) {
                    return res.status(400).json({ statusCode: 400, message: 'Application number is required' });
                }
                // Check if the applicant exists
                const existingApplicant = yield UserService_1.UserService.findApplicationNo(applicationNo);
                if (!existingApplicant) {
                    return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
                }
                // Ensure educationalDetails are in the correct format
                if (typeof educationalDetails !== 'object' || Array.isArray(educationalDetails)) {
                    return res.status(400).json({ statusCode: 400, message: 'Invalid educationalDetails format' });
                }
                // Process and save each reference entry
                const entries = Object.values(educationalDetails).filter(value => typeof value === 'object' && value !== null);
                if (entries.length === 0) {
                    return res.status(400).json({ statusCode: 400, message: 'No valid reference entries provided' });
                }
                const updatedEntries = [];
                const newEntries = [];
                for (const entry of entries) {
                    if (entry && typeof entry === 'object') {
                        const { courseOfStudy } = entry, restOfEntry = __rest(entry, ["courseOfStudy"]);
                        if (!courseOfStudy) {
                            return res.status(400).json({ statusCode: 400, message: 'Course of study is required' });
                        }
                        const existingEntry = yield EducationalDetailsService_1.EducationalDetailsService.findByApplicationNoAndCourseOfStudy(applicationNo, courseOfStudy);
                        if (existingEntry) {
                            // Update existing reference
                            yield EducationalDetailsService_1.EducationalDetailsService.update(existingEntry.id, Object.assign(Object.assign({}, restOfEntry), { applicationNo }));
                            updatedEntries.push(Object.assign(Object.assign({}, existingEntry), restOfEntry));
                        }
                        else {
                            // Create new reference
                            const newReference = yield EducationalDetailsService_1.EducationalDetailsService.create(Object.assign({ applicationNo }, entry));
                            newEntries.push(newReference);
                        }
                    }
                }
                return res.status(201).json({
                    message: 'Educational details processed successfully',
                    data: { updatedEntries, newEntries }
                });
            }
            catch (error) {
                console.error('Error creating or updating Educational details:', error);
                res.status(500).json({ message: 'Error creating or updating Educational details', error: error.message });
            }
        });
    }
    // Get Educational Details by applicationNo
    static getEducationalDetailsByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const educationalDetails = yield EducationalDetailsService_1.EducationalDetailsService.getEducationalDetailsByApplicationNo(applicationNo);
                if (!educationalDetails) {
                    return res.status(404).send({ message: 'Educational Details not found' });
                }
                res.status(200).send(educationalDetails);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching educational details', error: error.message });
            }
        });
    }
    // Update Educational Details by applicationNo
    static updateEducationalDetailsByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const updatedEducationalDetails = yield EducationalDetailsService_1.EducationalDetailsService.updateEducationalDetailsByApplicationNo(applicationNo, req.body);
                if (!updatedEducationalDetails) {
                    return res.status(404).send({ message: 'Educational Details not found' });
                }
                res.status(200).send(updatedEducationalDetails);
            }
            catch (error) {
                res.status(400).send({ message: 'Error updating educational details', error: error.message });
            }
        });
    }
    // Delete Educational Details by applicationNo
    static deleteEducationalDetailsByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const message = yield EducationalDetailsService_1.EducationalDetailsService.deleteEducationalDetailsByApplicationNo(applicationNo);
                res.status(200).send({ message });
            }
            catch (error) {
                res.status(404).send({ message: error.message });
            }
        });
    }
}
exports.EducationalDetailsController = EducationalDetailsController;
