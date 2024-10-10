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
exports.createAgreement = void 0;
const pdfGenerator_1 = require("../utils/pdfGenerator");
const emailActions_1 = require("../lib/emailActions");
const UserService_1 = require("../services/UserService");
const ContactDetailsService_1 = require("../services/ContactDetailsService");
const path_1 = __importDefault(require("path"));
// Function to get the current date in the desired format
const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October',
        'November', 'December'
    ];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    return {
        day: day.toString(), // Convert day to string
        month: month, // Month as a string
        year: year // Year as a number
    };
};
const createAgreement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { applicationNo, jobTitle, jobDescription, startDate, amount } = req.body;
        // Find the applicant by application number
        const existingApplicant = yield UserService_1.UserService.findApplicationNo(applicationNo);
        const applicantContact = yield ContactDetailsService_1.ContactDetailsService.getContactDetailsByApplicationNo(applicationNo);
        if (!existingApplicant) {
            return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
        }
        const { firstName, lastName, middleName, email } = existingApplicant;
        const { address_line_1, address_line_2, country, postcode } = applicantContact;
        // Get today's date
        const { day, month, year } = getCurrentDate();
        // Generate agreement data
        const agreementData = {
            firstName,
            lastName,
            middleName,
            email,
            address: `${address_line_1}, ${address_line_2}, ${country}, ${postcode}`,
            day,
            month,
            year
        };
        // Generate PDF file path
        const pdfPath = path_1.default.join(__dirname, '../../agreements', `${firstName}_${lastName}_agreement.pdf`);
        // Generate PDF using pdfkit
        yield (0, pdfGenerator_1.generatePDF)(agreementData, pdfPath);
        // Send the generated PDF via email
        yield (0, emailActions_1.sendAgreementEmail)({ firstName, email }, pdfPath);
        res.status(200).json({ message: 'Agreement generated and sent successfully.' });
    }
    catch (error) {
        console.error('Error generating agreement:', error);
        res.status(500).json({ error: 'Failed to generate agreement' });
    }
});
exports.createAgreement = createAgreement;
