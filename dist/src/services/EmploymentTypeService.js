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
exports.EmploymentTypeService = void 0;
const data_source_1 = require("../data-source");
const EmploymentTypeEntity_1 = require("../entities/EmploymentTypeEntity");
class EmploymentTypeService {
    constructor() {
        this.employmentTypeRepository = data_source_1.AppDataSource.getRepository(EmploymentTypeEntity_1.EmploymentType);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.employmentTypeRepository.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.employmentTypeRepository.findOneBy({ id });
        });
    }
    create(employmentTypeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const employmentType = this.employmentTypeRepository.create(employmentTypeData);
            return yield this.employmentTypeRepository.save(employmentType);
        });
    }
    update(id, employmentTypeData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.employmentTypeRepository.update(id, employmentTypeData);
            return this.getById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.employmentTypeRepository.delete(id);
        });
    }
}
exports.EmploymentTypeService = EmploymentTypeService;
