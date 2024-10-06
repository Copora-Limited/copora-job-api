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
class ContactDetailsController {
    // private static contactDetailsService = new ContactDetailsService();
    // Create or update ContactDetails based on applicationNo
    static createContactDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.body;
                // Check if the ContactDetails with the given applicationNo exists
                const existingContactDetails = yield ContactDetailsService_1.ContactDetailsService.getContactDetailsByApplicationNo(applicationNo);
                if (existingContactDetails) {
                    // If it exists, update the existing record
                    const updatedContactDetails = yield ContactDetailsService_1.ContactDetailsService.updateContactDetailsByApplicationNo(applicationNo, req.body);
                    return res.status(200).send({ message: 'Contact Details updated', data: updatedContactDetails });
                }
                else {
                    // If it does not exist, create a new record
                    const newContactDetails = yield ContactDetailsService_1.ContactDetailsService.createContactDetails(req.body);
                    return res.status(201).send({ message: 'Contact Details created', data: newContactDetails });
                }
            }
            catch (error) {
                res.status(500).send({ message: 'Error creating or updating contact details', error: error.message });
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
