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
const UserService_1 = require("../services/UserService");
class NextOfKinController {
    constructor() {
        this.nextOfKinRepository = data_source_1.AppDataSource.getRepository(NextOfKinEntity_1.NextOfKin);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { applicationNo } = req.body;
            try {
                const existingApplicant = yield UserService_1.UserService.findApplicationNo(applicationNo);
                if (!existingApplicant) {
                    return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
                }
                // Check if an entry with the given applicationNo already exists
                let existingEntry = yield this.nextOfKinRepository.findOneBy({ applicationNo });
                if (existingEntry) {
                    // Update the existing entry with the new data
                    this.nextOfKinRepository.merge(existingEntry, req.body);
                    yield this.nextOfKinRepository.save(existingEntry);
                    return res.status(200).send({ message: 'Next of Kin updated', data: existingEntry }); // Return updated entry
                }
                else {
                    // Create a new entry if none exists
                    const nextOfKin = this.nextOfKinRepository.create(req.body);
                    yield this.nextOfKinRepository.save(nextOfKin);
                    return res.status(201).send({ message: 'Entry created', data: nextOfKin }); // Return newly created entry
                }
            }
            catch (error) {
                console.error('Error creating/updating NextOfKin:', error);
                return res.status(500).send({ message: 'Internal Server Error' });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextOfKin = yield this.nextOfKinRepository.find();
            res.status(200).send(nextOfKin);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextOfKin = yield this.nextOfKinRepository.findOneBy({ id: parseInt(req.params.id) });
            if (!nextOfKin) {
                return res.status(404).send('Next of Kin not found');
            }
            res.status(200).send(nextOfKin);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextOfKin = yield this.nextOfKinRepository.findOneBy({ id: parseInt(req.params.id) });
            if (!nextOfKin) {
                return res.status(404).send('Next of Kin not found');
            }
            Object.assign(nextOfKin, req.body);
            yield this.nextOfKinRepository.save(nextOfKin);
            res.status(200).send(nextOfKin);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.nextOfKinRepository.delete({ id: parseInt(req.params.id) });
            if (result.affected === 0) {
                return res.status(404).send('Next of Kin not found');
            }
            res.status(200).send('Next of Kin deleted');
        });
    }
}
exports.NextOfKinController = NextOfKinController;
