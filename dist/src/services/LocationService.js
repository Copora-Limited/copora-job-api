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
class LocationService {
    constructor() {
        this.locationRepository = data_source_1.AppDataSource.getRepository(LocationEntity_1.Location);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.locationRepository.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.locationRepository.findOneBy({ id });
        });
    }
    create(locationData) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = this.locationRepository.create(locationData);
            return yield this.locationRepository.save(location);
        });
    }
    update(id, locationData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.locationRepository.update(id, locationData);
            return this.getById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.locationRepository.delete(id);
        });
    }
}
exports.LocationService = LocationService;