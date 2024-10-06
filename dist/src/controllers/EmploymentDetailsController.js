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
exports.EmploymentDetailsController = void 0;
const data_source_1 = require("../data-source");
const EmploymentDetailsEntity_1 = require("../entities/EmploymentDetailsEntity");
class EmploymentDetailsController {
    constructor() {
        this.employmentDetailsRepository = data_source_1.AppDataSource.getRepository(EmploymentDetailsEntity_1.EmploymentDetails);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employmentDetails = this.employmentDetailsRepository.create(req.body);
            yield this.employmentDetailsRepository.save(employmentDetails);
            res.status(201).send(employmentDetails);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employmentDetails = yield this.employmentDetailsRepository.find();
            res.status(200).send(employmentDetails);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employmentDetails = yield this.employmentDetailsRepository.findOneBy({ id: parseInt(req.params.id) });
            if (!employmentDetails) {
                return res.status(404).send('Employment Details not found');
            }
            res.status(200).send(employmentDetails);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employmentDetails = yield this.employmentDetailsRepository.findOneBy({ id: parseInt(req.params.id) });
            if (!employmentDetails) {
                return res.status(404).send('Employment Details not found');
            }
            Object.assign(employmentDetails, req.body);
            yield this.employmentDetailsRepository.save(employmentDetails);
            res.status(200).send(employmentDetails);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.employmentDetailsRepository.delete({ id: parseInt(req.params.id) });
            if (result.affected === 0) {
                return res.status(404).send('Employment Details not found');
            }
            res.status(200).send('Employment Details deleted');
        });
    }
}
exports.EmploymentDetailsController = EmploymentDetailsController;
