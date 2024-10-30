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
exports.ContactDetailsController = void 0;
const ContactDetailsService_1 = require("../services/ContactDetailsService");
const formValidation_1 = require("../utils/formValidation");
class ContactDetailsController {
    // Public method to create or update contact details
    static createContactDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Data:", req.body);
                const { applicationNo, phone, address_line_1, town, country, postcode } = req.body;
                // Validation checks
                if (!phone) {
                    return res.status(400).json({ message: 'Phone number is required' });
                }
                // Use the validatePhone method
                if (!(0, formValidation_1.validatePhone)(phone)) {
                    return res.status(400).json({
                        message: 'Phone number should be a valid UK number (starting with +44 or 44 followed by 10 digits, or 10-11 digits locally) or a valid international format (+ followed by 10-15 digits).'
                    });
                }
                if (!address_line_1) {
                    return res.status(400).json({ message: 'Property name or number is required' });
                }
                if (!town) {
                    return res.status(400).json({ message: 'Town is required' });
                }
                if (!/^[a-zA-Z\s]+$/.test(town)) {
                    return res.status(400).json({ message: 'Town should contain letters only' });
                }
                if (!country) {
                    return res.status(400).json({ message: 'Country is required' });
                }
                if (!postcode) {
                    return res.status(400).json({ message: 'Postcode is required' });
                }
                // Check if ContactDetails with the given applicationNo exists
                const existingContactDetails = yield ContactDetailsService_1.ContactDetailsService.getContactDetailsByApplicationNo(applicationNo);
                if (existingContactDetails) {
                    // Update existing record if found
                    const updateRecord = Object.assign(Object.assign({}, req.body), { attempted: true });
                    const updatedContactDetails = yield ContactDetailsService_1.ContactDetailsService.updateContactDetailsByApplicationNo(applicationNo, updateRecord);
                    return res.status(200).json({ message: 'Contact Details updated', data: updatedContactDetails });
                }
                else {
                    // Create a new record with 'attempted' set to true
                    const newContactDetailsData = Object.assign(Object.assign({}, req.body), { attempted: true });
                    const newContactDetails = yield ContactDetailsService_1.ContactDetailsService.createContactDetails(newContactDetailsData);
                    return res.status(201).json({ message: 'Contact Details created', data: newContactDetails });
                }
            }
            catch (error) {
                console.error('Error creating or updating contact details:', error);
                res.status(500).json({ message: 'Error creating or updating contact details', error: error.message });
            }
        });
    }
    // Get Contact Details by applicationNo
    static getContactDetailsByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const contactDetails = yield ContactDetailsService_1.ContactDetailsService.getContactDetailsByApplicationNo(applicationNo);
                if (!contactDetails) {
                    return res.status(404).send({ message: 'Contact Details not found' });
                }
                res.status(200).send(contactDetails);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching contact details', error: error.message });
            }
        });
    }
    // Update Contact Details by applicationNo
    static updateContactDetailsByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const updatedContactDetails = yield ContactDetailsService_1.ContactDetailsService.updateContactDetailsByApplicationNo(applicationNo, req.body);
                if (!updatedContactDetails) {
                    return res.status(404).send({ message: 'Contact Details not found' });
                }
                res.status(200).send(updatedContactDetails);
            }
            catch (error) {
                res.status(400).send({ message: 'Error updating contact details', error: error.message });
            }
        });
    }
    // Delete Contact Details by applicationNo
    static deleteContactDetailsByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const message = yield ContactDetailsService_1.ContactDetailsService.deleteContactDetailsByApplicationNo(applicationNo);
                res.status(200).send({ message });
            }
            catch (error) {
                res.status(404).send({ message: error.message });
            }
        });
    }
}
exports.ContactDetailsController = ContactDetailsController;
