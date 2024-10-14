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
exports.LocationService = void 0;
const data_source_1 = require("../data-source");
const LocationEntity_1 = require("../entities/LocationEntity");
const locationRepository = data_source_1.AppDataSource.getRepository(LocationEntity_1.Location);
class LocationService {
    static getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield locationRepository.findOneBy({ name });
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield locationRepository.find();
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield locationRepository.findOneBy({ id });
        });
    }
    static create(locationData) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = locationRepository.create(locationData);
            return yield locationRepository.save(location);
        });
    }
    static update(id, locationData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield locationRepository.update(id, locationData);
            return this.getById(id);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield locationRepository.delete(id);
        });
    }
}
exports.LocationService = LocationService;
