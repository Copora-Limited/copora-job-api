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
exports.JobTitleService = void 0;
const data_source_1 = require("../data-source");
const JobTitleEntity_1 = require("../entities/JobTitleEntity");
class JobTitleService {
    constructor() {
        this.jobTitleRepository = data_source_1.AppDataSource.getRepository(JobTitleEntity_1.JobTitle);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jobTitleRepository.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jobTitleRepository.findOneBy({ id });
        });
    }
    create(jobTitleData) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobTitle = this.jobTitleRepository.create(jobTitleData);
            return yield this.jobTitleRepository.save(jobTitle);
        });
    }
    update(id, jobTitleData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.jobTitleRepository.update(id, jobTitleData);
            return this.getById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jobTitleRepository.delete(id);
        });
    }
}
exports.JobTitleService = JobTitleService;
