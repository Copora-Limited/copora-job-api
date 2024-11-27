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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationController = void 0;
const ApplicationService_1 = require("../services/ApplicationService");
const constants_1 = require("../constants");
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const json2csv_1 = require("json2csv"); // Import json2csv for converting JSON to CSV
const pdfkit_1 = __importDefault(require("pdfkit")); // For PDF generation
class ApplicationController {
    // constructor() {
    //   this.autoFillApplicationFormWithUploadedResume = this.autoFillApplicationFormWithUploadedResume.bind(this);
    // }
    static getOnboardingStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Onboarding status route hit');
            const statuses = Object.values(constants_1.OnboardingStatus);
            res.status(200).json({ success: true, data: statuses });
        });
    }
    static createApplication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ApplicationService_1.ApplicationService.createApplication(req.body);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    static getApplicationByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ApplicationService_1.ApplicationService.getApplicationByNo(req.params.applicationNo);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    static updateApplicationByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ApplicationService_1.ApplicationService.updateApplicationByNo(req.params.applicationNo, req.body);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    static getApplicantData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ApplicationService_1.ApplicationService.getApplicantData(req.params.applicationNo);
                if (!result.user) {
                    return res.status(404).json({ message: 'Applicant not found' });
                }
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    // Controller
    static getApplicantAttemptedData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ApplicationService_1.ApplicationService.getApplicantAttemptedData(req.params.applicationNo);
                // Check if the user attempted status is available
                // const userAttemptedStatus = result.find(item => item.hasOwnProperty('user'));
                // if (!userAttemptedStatus || !userAttemptedStatus.user) {
                //     return res.status(404).json({ message: 'Applicant not found' });
                // }
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static getAllApplicants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ApplicationService_1.ApplicationService.getAllApplicants();
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    // Method to handle auto-filling the application form using an uploaded resume
    static autoFillApplicationFormWithUploadedResume(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    return res.status(400).json({ message: 'Resume file is required' });
                }
                console.log("Received request to auto-fill form with resume.");
                console.log("Resume file received:", req.file.originalname);
                const resumeBuffer = req.file.buffer;
                console.log("Extracting text from resume buffer...");
                // Validate buffer
                if (!Buffer.isBuffer(resumeBuffer)) {
                    throw new Error("Uploaded file is not a valid buffer");
                }
                // Extract text from resume PDF
                const resumeText = yield (0, pdf_parse_1.default)(resumeBuffer);
                console.log("Text extracted from resume:", resumeText.text);
                // Extract data from the resume text
                const extractedData = yield ApplicationController.extractDataFromResume(resumeText.text);
                return res.status(200).json({
                    message: 'Resume processed successfully',
                    extractedData,
                });
            }
            catch (error) {
                console.error('Error processing resume:', error);
                return res.status(500).json({ message: 'Error processing resume', error: error.message });
            }
        });
    }
    static extractDataFromResume(resumeText) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Extracting data from resume text...');
            const extractedData = {};
            // Step 1: Normalize the text (remove unnecessary whitespaces, standardize new lines)
            resumeText = resumeText.replace(/\r?\n|\r/g, "\n").trim();
            // Step 2: Extract Name (Account for name-like patterns or contextual cues)
            // Example: Look for "Name" or assume first proper noun is the name
            const nameRegex = /(?:Name[:\s]*)?([A-Z][a-z]+(?: [A-Z][a-z]+)+)/;
            const nameMatch = resumeText.match(nameRegex);
            if (nameMatch) {
                extractedData.name = nameMatch[1].trim();
                console.log('Extracted name:', extractedData.name);
            }
            else {
                console.log('Name not found in resume text.');
            }
            // Step 3: Extract Email (More precise regex for email)
            const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
            const emailMatch = resumeText.match(emailRegex);
            if (emailMatch) {
                extractedData.email = emailMatch[0].trim();
                console.log('Extracted email:', extractedData.email);
            }
            else {
                console.log('Email not found in resume text.');
            }
            // Step 4: Extract Phone Number (Handle different phone formats)
            const phoneRegex = /(\+?\d{1,3}[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/;
            const phoneMatch = resumeText.match(phoneRegex);
            if (phoneMatch) {
                extractedData.phone = phoneMatch[0].trim();
                console.log('Extracted phone number:', extractedData.phone);
            }
            else {
                console.log('Phone number not found in resume text.');
            }
            // Step 5: Extract Work Experience (Section-based extraction with keyword search)
            const workExperienceRegex = /(?:Work Experience|Experience|Professional Experience)[\s\S]+?(?=Projects|Education|Skills)/i;
            const workExperienceMatch = resumeText.match(workExperienceRegex);
            if (workExperienceMatch) {
                extractedData.workExperience = workExperienceMatch[0].trim();
                console.log('Extracted work experience:', extractedData.workExperience);
            }
            else {
                console.log('Work experience not found in resume text.');
            }
            // Step 6: Extract Projects (Similar logic as Work Experience)
            const projectsRegex = /(?:Projects|Project Experience|Key Projects)[\s\S]+?(?=Education|Skills|Certifications)/i;
            const projectsMatch = resumeText.match(projectsRegex);
            if (projectsMatch) {
                extractedData.projects = projectsMatch[0].trim();
                console.log('Extracted projects:', extractedData.projects);
            }
            else {
                console.log('Projects not found in resume text.');
            }
            // Step 7: Extract Education (Similar logic for education section)
            const educationRegex = /(?:Education|Academic Background|Degrees)[\s\S]+?(?=Skills|Certifications|Projects)/i;
            const educationMatch = resumeText.match(educationRegex);
            if (educationMatch) {
                extractedData.education = educationMatch[0].trim();
                console.log('Extracted education:', extractedData.education);
            }
            else {
                console.log('Education not found in resume text.');
            }
            // Step 8: Extract Skills
            const skillsRegex = /(?:Skills|Technical Skills|Core Competencies)[\s\S]+?(?=Education|Experience|Projects|Certifications)/i;
            const skillsMatch = resumeText.match(skillsRegex);
            if (skillsMatch) {
                extractedData.skills = skillsMatch[0].trim();
                console.log('Extracted skills:', extractedData.skills);
            }
            else {
                console.log('Skills not found in resume text.');
            }
            return extractedData;
        });
    }
    // New method for downloading applicant data as CSV
    static downloadApplicantDataCsv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
            try {
                const { applicationNo } = req.params;
                const applicantData = yield ApplicationService_1.ApplicationService.getApplicantData(applicationNo);
                if (!applicantData) {
                    return res.status(404).json({ message: 'Applicant not found' });
                }
                // Map applicant data into the CSV structure
                const csvData = {
                    Title: (_a = applicantData.personalDetails) === null || _a === void 0 ? void 0 : _a.title,
                    Forename1: (_b = applicantData.user) === null || _b === void 0 ? void 0 : _b.firstName,
                    Forename2: (_c = applicantData.user) === null || _c === void 0 ? void 0 : _c.middleName,
                    Surname: (_d = applicantData.user) === null || _d === void 0 ? void 0 : _d.lastName,
                    PreferredName: (_e = applicantData.user) === null || _e === void 0 ? void 0 : _e.firstName,
                    Telephone: (_f = applicantData.contactDetails) === null || _f === void 0 ? void 0 : _f.phone,
                    Mobile: (_g = applicantData.contactDetails) === null || _g === void 0 ? void 0 : _g.phone, // Assuming phone is used for both
                    Email: (_h = applicantData.user) === null || _h === void 0 ? void 0 : _h.email,
                    Address: `${(_j = applicantData.contactDetails) === null || _j === void 0 ? void 0 : _j.address_line_1}, ${(_k = applicantData.contactDetails) === null || _k === void 0 ? void 0 : _k.town}, ${(_l = applicantData.contactDetails) === null || _l === void 0 ? void 0 : _l.postcode}`,
                    Country: (_m = applicantData.contactDetails) === null || _m === void 0 ? void 0 : _m.country,
                    Gender: (_o = applicantData.personalDetails) === null || _o === void 0 ? void 0 : _o.gender,
                    Birthday: (_p = applicantData.personalDetails) === null || _p === void 0 ? void 0 : _p.dateOfBirth,
                    ProfilePicture: (_q = applicantData.personalDetails) === null || _q === void 0 ? void 0 : _q.passportPhoto, // Assuming passport photo contains passport info
                    NINumber: (_r = applicantData.personalDetails) === null || _r === void 0 ? void 0 : _r.nationalInsuranceNumber,
                    WorksNumber: '', // This field is not mapped in your data
                    Department: '', // This field is not mapped in your data
                    JobTitle: (_t = (_s = applicantData.professionalDetails) === null || _s === void 0 ? void 0 : _s[0]) === null || _t === void 0 ? void 0 : _t.jobTitle,
                    College: (_v = (_u = applicantData.educationalDetails) === null || _u === void 0 ? void 0 : _u[0]) === null || _v === void 0 ? void 0 : _v.schoolName,
                    DateStarted: (_x = (_w = applicantData.professionalDetails) === null || _w === void 0 ? void 0 : _w[0]) === null || _x === void 0 ? void 0 : _x.startDate,
                    DateLeft: (_z = (_y = applicantData.professionalDetails) === null || _y === void 0 ? void 0 : _y[0]) === null || _z === void 0 ? void 0 : _z.endDate,
                    Director: (_0 = applicantData.personalDetails) === null || _0 === void 0 ? void 0 : _0.ninProof, // This field is not mapped in your data
                    DirectorStartDate: applicantData.personalDetails.visaDocument, // This field is not mapped in your data
                    DirectorEndDate: applicantData.personalDetails.internationalPassport, // This field is not mapped in your data
                    AlternativeDirectorsNIC: '', // This field is not mapped in your data
                    PrimaryNICOnly: '', // This field is not mapped in your data
                    PayFrequency: '', // This field is not mapped in your data
                    PayMethod: '', // This field is not mapped in your data
                    DeliveryMethod: '', // This field is not mapped in your data
                    BankName: (_1 = applicantData.bankDetails) === null || _1 === void 0 ? void 0 : _1.bankName,
                    BranchName: '', // This field is not mapped in your data
                    SortCode: (_2 = applicantData.bankDetails) === null || _2 === void 0 ? void 0 : _2.sortCode,
                    AccountName: (_3 = applicantData.bankDetails) === null || _3 === void 0 ? void 0 : _3.accountName,
                    AccountNumber: (_4 = applicantData.bankDetails) === null || _4 === void 0 ? void 0 : _4.accountNumber,
                    PaymentReference: '', // This field is not mapped in your data
                    BuildingSocietyReference: '', // This field is not mapped in your data
                    BankTelephone: '', // This field is not mapped in your data
                    BankAddress: '', // This field is not mapped in your data
                    AEExcluded: '', // This field is not mapped in your data
                    PostponedUntil: '', // This field is not mapped in your data
                    AEPension: '', // This field is not mapped in your data
                    AEJoined: '', // This field is not mapped in your data
                    AEOptedIn: '', // This field is not mapped in your data
                    AELeft: '', // This field is not mapped in your data
                    AEOptedOut: '', // This field is not mapped in your data
                    Group: '', // This field is not mapped in your data
                    EmployeePercentage: '', // This field is not mapped in your data
                    EmployerPercentage: '', // This field is not mapped in your data
                    AVCPercentage: '' // This field is not mapped in your data
                };
                // Convert the data to CSV
                const fields = Object.keys(csvData);
                const json2csvParser = new json2csv_1.Parser({ fields });
                const csv = json2csvParser.parse([csvData]); // Wrap csvData in an array to avoid issue with a single row
                // Set headers for file download
                res.header('Content-Type', 'text/csv');
                res.attachment(`applicant_${applicationNo}.csv`);
                return res.send(csv);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    // New method for downloading all applicants' data as CSV
    static downloadAllApplicantsCsv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all applicants from the service
                const allApplicants = yield ApplicationService_1.ApplicationService.getAllApplicantsData(); // Update to the correct method name
                if (!allApplicants || allApplicants.length === 0) {
                    return res.status(404).json({ message: 'No applicants found' });
                }
                // Map all applicants' data into the CSV structure
                const csvData = allApplicants.map(applicant => {
                    var _a, _b, _c, _d;
                    const { personalDetails, user, contactDetails, professionalDetails, educationalDetails, bankDetails } = applicant;
                    return {
                        Title: personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails.title,
                        Forename1: user === null || user === void 0 ? void 0 : user.firstName,
                        Forename2: user === null || user === void 0 ? void 0 : user.middleName,
                        Surname: user === null || user === void 0 ? void 0 : user.lastName,
                        PreferredName: user === null || user === void 0 ? void 0 : user.firstName,
                        Telephone: contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.phone,
                        Mobile: contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.phone, // Assuming phone is used for both
                        Email: user === null || user === void 0 ? void 0 : user.email,
                        Address: `${contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.address_line_1}, ${contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.town}, ${contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.postcode}`,
                        Country: contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.country,
                        Gender: personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails.gender,
                        Birthday: personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails.dateOfBirth,
                        PassportNumber: personalDetails.internationalPassport, // Assuming passport photo contains passport info
                        NINumber: personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails.nationalInsuranceNumber,
                        WorksNumber: '', // Not mapped
                        Department: '', // Not mapped
                        JobTitle: (_a = professionalDetails === null || professionalDetails === void 0 ? void 0 : professionalDetails[0]) === null || _a === void 0 ? void 0 : _a.jobTitle,
                        College: (_b = educationalDetails === null || educationalDetails === void 0 ? void 0 : educationalDetails[0]) === null || _b === void 0 ? void 0 : _b.schoolName,
                        DateStarted: (_c = professionalDetails === null || professionalDetails === void 0 ? void 0 : professionalDetails[0]) === null || _c === void 0 ? void 0 : _c.startDate,
                        DateLeft: (_d = professionalDetails === null || professionalDetails === void 0 ? void 0 : professionalDetails[0]) === null || _d === void 0 ? void 0 : _d.endDate,
                        Director: personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails.passportPhoto, // Not mapped
                        DirectorStartDate: personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails.ninProof, // This field is not mapped in your data
                        DirectorEndDate: personalDetails.internationalPassport, // This field is not mapped in your data
                        AlternativeDirectorsNIC: personalDetails.visaDocument, // Not mapped
                        PrimaryNICOnly: '', // Not mapped
                        PayFrequency: '', // Not mapped
                        PayMethod: '', // Not mapped
                        DeliveryMethod: '', // Not mapped
                        BankName: bankDetails === null || bankDetails === void 0 ? void 0 : bankDetails.bankName,
                        BranchName: '', // Not mapped
                        SortCode: bankDetails === null || bankDetails === void 0 ? void 0 : bankDetails.sortCode,
                        AccountName: bankDetails === null || bankDetails === void 0 ? void 0 : bankDetails.accountName,
                        AccountNumber: bankDetails === null || bankDetails === void 0 ? void 0 : bankDetails.accountNumber,
                        PaymentReference: '', // Not mapped
                        BuildingSocietyReference: '', // Not mapped
                        BankTelephone: '', // Not mapped
                        BankAddress: '', // Not mapped
                        AEExcluded: '', // Not mapped
                        PostponedUntil: '', // Not mapped
                        AEPension: '', // Not mapped
                        AEJoined: '', // Not mapped
                        AEOptedIn: '', // Not mapped
                        AELeft: '', // Not mapped
                        AEOptedOut: '', // Not mapped
                        Group: '', // Not mapped
                        EmployeePercentage: '', // Not mapped
                        EmployerPercentage: '', // Not mapped
                        AVCPercentage: '' // Not mapped
                    };
                });
                // Convert the data to CSV
                const fields = Object.keys(csvData[0]);
                const json2csvParser = new json2csv_1.Parser({ fields });
                const csv = json2csvParser.parse(csvData); // Parse all applicants' data into CSV
                // Set headers for file download
                res.header('Content-Type', 'text/csv');
                res.attachment('all_applicants.csv');
                return res.send(csv);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    // New method for downloading applicant data as PDF
    static downloadApplicantDataPdf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
            try {
                const { applicationNo } = req.params;
                const applicantData = yield ApplicationService_1.ApplicationService.getApplicantData(applicationNo);
                if (!applicantData) {
                    return res.status(404).json({ message: 'Applicant not found' });
                }
                // Initialize PDF document
                const doc = new pdfkit_1.default();
                // Set response headers for PDF download
                res.setHeader('Content-disposition', `attachment; filename="applicant_${applicationNo}.pdf"`);
                res.setHeader('Content-type', 'application/pdf');
                // Pipe the PDF into the response
                doc.pipe(res);
                // Add content to the PDF
                doc.fontSize(18).text(`Applicant Data - ${applicationNo}`, { align: 'center' });
                doc.moveDown();
                // Add applicant data to PDF
                doc.fontSize(12).text(`Title: ${((_a = applicantData.personalDetails) === null || _a === void 0 ? void 0 : _a.title) || 'N/A'}`);
                doc.text(`Forename1: ${((_b = applicantData.user) === null || _b === void 0 ? void 0 : _b.firstName) || 'N/A'}`);
                doc.text(`Forename2: ${((_c = applicantData.user) === null || _c === void 0 ? void 0 : _c.middleName) || 'N/A'}`);
                doc.text(`Surname: ${((_d = applicantData.user) === null || _d === void 0 ? void 0 : _d.lastName) || 'N/A'}`);
                doc.text(`PreferredName: ${((_e = applicantData.user) === null || _e === void 0 ? void 0 : _e.firstName) || 'N/A'}`);
                doc.text(`Telephone: ${((_f = applicantData.contactDetails) === null || _f === void 0 ? void 0 : _f.phone) || 'N/A'}`);
                doc.text(`Mobile: ${((_g = applicantData.contactDetails) === null || _g === void 0 ? void 0 : _g.phone) || 'N/A'}`);
                doc.text(`Email: ${((_h = applicantData.user) === null || _h === void 0 ? void 0 : _h.email) || 'N/A'}`);
                doc.text(`Address: ${((_j = applicantData.contactDetails) === null || _j === void 0 ? void 0 : _j.address_line_1) || 'N/A'}, ${((_k = applicantData.contactDetails) === null || _k === void 0 ? void 0 : _k.town) || 'N/A'}, ${((_l = applicantData.contactDetails) === null || _l === void 0 ? void 0 : _l.postcode) || 'N/A'}`);
                doc.text(`Country: ${((_m = applicantData.contactDetails) === null || _m === void 0 ? void 0 : _m.country) || 'N/A'}`);
                doc.text(`Gender: ${((_o = applicantData.personalDetails) === null || _o === void 0 ? void 0 : _o.gender) || 'N/A'}`);
                doc.text(`Birthday: ${((_p = applicantData.personalDetails) === null || _p === void 0 ? void 0 : _p.dateOfBirth) || 'N/A'}`);
                doc.text(`PassportNumber: ${((_q = applicantData.personalDetails) === null || _q === void 0 ? void 0 : _q.passportPhoto) || 'N/A'}`);
                doc.text(`NINumber: ${((_r = applicantData.personalDetails) === null || _r === void 0 ? void 0 : _r.nationalInsuranceNumber) || 'N/A'}`);
                doc.text(`JobTitle: ${((_t = (_s = applicantData.professionalDetails) === null || _s === void 0 ? void 0 : _s[0]) === null || _t === void 0 ? void 0 : _t.jobTitle) || 'N/A'}`);
                doc.text(`College: ${((_v = (_u = applicantData.educationalDetails) === null || _u === void 0 ? void 0 : _u[0]) === null || _v === void 0 ? void 0 : _v.schoolName) || 'N/A'}`);
                doc.text(`DateStarted: ${((_x = (_w = applicantData.professionalDetails) === null || _w === void 0 ? void 0 : _w[0]) === null || _x === void 0 ? void 0 : _x.startDate) || 'N/A'}`);
                doc.text(`DateLeft: ${((_z = (_y = applicantData.professionalDetails) === null || _y === void 0 ? void 0 : _y[0]) === null || _z === void 0 ? void 0 : _z.endDate) || 'N/A'}`);
                doc.text(`BankName: ${((_0 = applicantData.bankDetails) === null || _0 === void 0 ? void 0 : _0.bankName) || 'N/A'}`);
                doc.text(`SortCode: ${((_1 = applicantData.bankDetails) === null || _1 === void 0 ? void 0 : _1.sortCode) || 'N/A'}`);
                doc.text(`AccountName: ${((_2 = applicantData.bankDetails) === null || _2 === void 0 ? void 0 : _2.accountName) || 'N/A'}`);
                doc.text(`AccountNumber: ${((_3 = applicantData.bankDetails) === null || _3 === void 0 ? void 0 : _3.accountNumber) || 'N/A'}`);
                // Finalize the PDF and end the stream
                doc.end();
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    // Delete applicant record from all table
    static deleteApplicant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params; // Extract application number from the request parameters
                const result = yield ApplicationService_1.ApplicationService.deleteApplicantData(applicationNo);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    // Delete applicant data from all tables for users with the 'applicant' role
    static deleteApplicants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ApplicationService_1.ApplicationService.deleteAllApplicantData();
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.ApplicationController = ApplicationController;
