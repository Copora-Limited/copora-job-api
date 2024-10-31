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
exports.NextOfKinController = void 0;
const data_source_1 = require("../data-source");
const NextOfKinEntity_1 = require("../entities/NextOfKinEntity");
const NextOfKinService_1 = require("../services/NextOfKinService");
const UserService_1 = require("../services/UserService");
const formValidation_1 = require("../utils/formValidation");
const nextOfKinRepository = data_source_1.AppDataSource.getRepository(NextOfKinEntity_1.NextOfKin);
class NextOfKinController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { applicationNo, firstName, lastname, relationship, email, phone, address } = req.body;
            try {
                // Check if all required fields are provided
                if (!firstName) {
                    return res.status(400).json({ statusCode: 400, message: 'First Name is required' });
                }
                if (!lastname) {
                    return res.status(400).json({ statusCode: 400, message: 'Last Name is required' });
                }
                if (!relationship) {
                    return res.status(400).json({ statusCode: 400, message: 'Select Relationship is required' });
                }
                if (!phone) {
                    return res.status(400).json({ statusCode: 400, message: 'Phone Number is required' });
                }
                if (!(0, formValidation_1.validatePhone)(phone)) {
                    return res.status(400).json({
                        message: 'Phone number should be a valid UK number (starting with +44 or 44 followed by 10 digits, or 10-11 digits locally) or a valid international format (+ followed by 10-15 digits).'
                    });
                }
                if (!email) {
                    return res.status(400).json({ statusCode: 400, message: 'Email is required' });
                }
                if (!address) {
                    return res.status(400).json({ statusCode: 400, message: 'Address is required' });
                }
                // Validate applicationNo
                const existingApplicant = yield UserService_1.UserService.findApplicationNo(applicationNo);
                if (!existingApplicant) {
                    return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
                }
                // Check if an entry with the given applicationNo already exists
                let existingEntry = yield nextOfKinRepository.findOneBy({ applicationNo });
                if (existingEntry) {
                    // Update the existing entry with the new data
                    const updateRecord = Object.assign(Object.assign({}, req.body), { attempted: true });
                    nextOfKinRepository.merge(existingEntry, updateRecord);
                    yield nextOfKinRepository.save(existingEntry);
                    return res.status(200).send({ message: 'Emergency Contact updated Sucessfully', data: existingEntry }); // Return updated entry
                }
                else {
                    // Create a new entry if none exists
                    const nextOfKin = nextOfKinRepository.create(Object.assign(Object.assign({}, req.body), { attempted: true }));
                    yield nextOfKinRepository.save(nextOfKin);
                    return res.status(201).send({ message: 'Emergency Contact created Sucessfully', data: nextOfKin }); // Return newly created entry
                }
            }
            catch (error) {
                console.error('Error creating/updating NextOfKin:', error);
                return res.status(500).send({ message: 'Internal Server Error' });
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextOfKin = yield nextOfKinRepository.find();
            res.status(200).send(nextOfKin);
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextOfKin = yield nextOfKinRepository.findOneBy({ id: parseInt(req.params.id) });
            if (!nextOfKin) {
                return res.status(404).send('Emergency Contact not found');
            }
            res.status(200).send(nextOfKin);
        });
    }
    static getByApplicationNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("req:", req.params);
            try {
                const { applicationNo } = req.params;
                const entry = yield NextOfKinService_1.NextOfKinService.getNextOfKinByApplicationNo(applicationNo);
                console.log("entry:", entry);
                if (!entry) {
                    return res.status(404).send({ message: 'Next of Kin not found' });
                }
                res.status(200).send(entry);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching Next of Kin', error: error.message });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextOfKin = yield nextOfKinRepository.findOneBy({ id: parseInt(req.params.id) });
            if (!nextOfKin) {
                return res.status(404).send('Emergency Contact not found');
            }
            Object.assign(nextOfKin, req.body);
            yield nextOfKinRepository.save(nextOfKin);
            res.status(200).send(nextOfKin);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield nextOfKinRepository.delete({ id: parseInt(req.params.id) });
            if (result.affected === 0) {
                return res.status(404).send('Emergency Contact not found');
            }
            res.status(200).send('Emergency Contact deleted');
        });
    }
}
exports.NextOfKinController = NextOfKinController;
