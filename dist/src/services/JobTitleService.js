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
const jobTitleRepository = data_source_1.AppDataSource.getRepository(JobTitleEntity_1.JobTitle);
class JobTitleService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield jobTitleRepository.find();
            }
            catch (error) {
                throw new Error(`Error fetching job titles: ${error.message}`);
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield jobTitleRepository.findOneBy({ id });
            }
            catch (error) {
                throw new Error(`Error fetching job title with ID ${id}: ${error.message}`);
            }
        });
    }
    static create(jobTitleData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobTitle = jobTitleRepository.create(jobTitleData);
                return yield jobTitleRepository.save(jobTitle);
            }
            catch (error) {
                throw new Error(`Error creating job title: ${error.message}`);
            }
        });
    }
    static update(id, jobTitleData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield jobTitleRepository.update(id, jobTitleData);
                return yield this.getById(id);
            }
            catch (error) {
                throw new Error(`Error updating job title with ID ${id}: ${error.message}`);
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield jobTitleRepository.delete(id);
                if (result.affected === 0) {
                    throw new Error(`Job title with ID ${id} not found`);
                }
                return { message: 'Job title deleted successfully' };
            }
            catch (error) {
                throw new Error(`Error deleting job title with ID ${id}: ${error.message}`);
            }
        });
    }
}
exports.JobTitleService = JobTitleService;
