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
exports.JobListingService = void 0;
const data_source_1 = require("../data-source");
const JobListingEntity_1 = require("../entities/JobListingEntity");
const LocationEntity_1 = require("../entities/LocationEntity");
const EmploymentTypeEntity_1 = require("../entities/EmploymentTypeEntity");
const GroupEntity_1 = require("../entities/GroupEntity");
const JobTitleEntity_1 = require("../entities/JobTitleEntity");
const jobListingRepository = data_source_1.AppDataSource.getRepository(JobListingEntity_1.JobListing);
class JobListingService {
    static findByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jobListingRepository.findOneBy({ applicationNo });
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jobListingRepository.find();
        });
    }
    static getAllTags() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch details for each tag
                const location = yield data_source_1.AppDataSource.getRepository(LocationEntity_1.Location).find();
                const group = yield data_source_1.AppDataSource.getRepository(GroupEntity_1.Group).find();
                const employmentType = yield data_source_1.AppDataSource.getRepository(EmploymentTypeEntity_1.EmploymentType).find();
                const jobTitle = yield data_source_1.AppDataSource.getRepository(JobTitleEntity_1.JobTitle).find();
                // Organize data into an object with labeled properties
                const result = {
                    location: location || [], // If empty, return an empty array
                    group: group || [],
                    employmentType: employmentType || [],
                    jobTitle: jobTitle || [],
                };
                return result;
            }
            catch (error) {
                throw new Error(`Error retrieving all tags: ${error.message}`);
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jobListingRepository.findOneBy({ id });
        });
    }
    static create(jobListingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobListing = jobListingRepository.create(jobListingData);
            return yield jobListingRepository.save(jobListing);
        });
    }
    static update(id, jobListingData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield jobListingRepository.update(id, jobListingData);
            return this.getById(id);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jobListingRepository.delete(id);
        });
    }
}
exports.JobListingService = JobListingService;
