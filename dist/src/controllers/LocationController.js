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
exports.LocationController = void 0;
const LocationService_1 = require("../services/LocationService");
const locationService = new LocationService_1.LocationService();
class LocationController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const locations = yield locationService.getAll();
            res.json(locations);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const location = yield locationService.getById(id);
            if (location) {
                res.json(location);
            }
            else {
                res.status(404).json({ message: 'Location not found' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const locationData = req.body;
            const newLocation = yield locationService.create(locationData);
            res.status(201).json(newLocation);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const locationData = req.body;
            const updatedLocation = yield locationService.update(id, locationData);
            if (updatedLocation) {
                res.json(updatedLocation);
            }
            else {
                res.status(404).json({ message: 'Location not found' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield locationService.delete(id);
            res.status(204).send();
        });
    }
}
exports.LocationController = LocationController;
