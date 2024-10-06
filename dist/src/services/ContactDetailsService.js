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
exports.ContactDetailsService = void 0;
const ContactDetailsEntity_1 = require("../entities/ContactDetailsEntity");
const data_source_1 = require("../data-source");
const contactDetailsRepository = data_source_1.AppDataSource.getRepository(ContactDetailsEntity_1.ContactDetails);
class ContactDetailsService {
    // Create new ContactDetails
    static createContactDetails(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactDetails = contactDetailsRepository.create(data);
            return yield contactDetailsRepository.save(contactDetails);
        });
    }
    // Get ContactDetails by applicationNo
    static getContactDetailsByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield contactDetailsRepository.findOneBy({ applicationNo });
        });
    }
    // Update ContactDetails by applicationNo
    static updateContactDetailsByApplicationNo(applicationNo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield contactDetailsRepository.update({ applicationNo }, data);
            return yield contactDetailsRepository.findOneBy({ applicationNo });
        });
    }
    // Delete ContactDetails by applicationNo
    static deleteContactDetailsByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield contactDetailsRepository.delete({ applicationNo });
            if (result.affected === 0) {
                throw new Error('Contact Details not found');
            }
            return 'Contact Details deleted';
        });
    }
}
exports.ContactDetailsService = ContactDetailsService;
