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
exports.NextOfKinService = void 0;
const NextOfKinEntity_1 = require("../entities/NextOfKinEntity");
const data_source_1 = require("../data-source");
const NextOfKinRepository = data_source_1.AppDataSource.getRepository(NextOfKinEntity_1.NextOfKin);
class NextOfKinService {
    // Create new NextOfKin
    static createNextOfKin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const NextOfKin = NextOfKinRepository.create(data);
            return yield NextOfKinRepository.save(NextOfKin);
        });
    }
    // Get NextOfKin by applicationNo
    static getNextOfKinByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield NextOfKinRepository.findOneBy({ applicationNo });
        });
    }
    // Update NextOfKin by applicationNo
    static updateNextOfKinByApplicationNo(applicationNo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield NextOfKinRepository.update({ applicationNo }, data);
            return yield NextOfKinRepository.findOneBy({ applicationNo });
        });
    }
    // Delete NextOfKin by applicationNo
    static deleteNextOfKinByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield NextOfKinRepository.delete({ applicationNo });
            if (result.affected === 0) {
                throw new Error('Contact Details not found');
            }
            return 'Contact Details deleted';
        });
    }
}
exports.NextOfKinService = NextOfKinService;
