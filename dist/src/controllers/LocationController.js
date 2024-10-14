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
class LocationController {
    // Get all locations
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locations = yield LocationService_1.LocationService.getAll();
                res.status(200).json(locations);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching locations', error: error.message });
            }
        });
    }
    // Get location by ID
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Convert id to a number
                const numericId = parseInt(id, 10);
                // Check if the id is a valid number
                if (isNaN(numericId)) {
                    return res.status(400).json({ message: 'Invalid ID format' });
                }
                const location = yield LocationService_1.LocationService.getById(numericId);
                if (!location) {
                    return res.status(404).send({ message: 'Location not found' });
                }
                res.status(200).send(location);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching location', error: error.message });
            }
        });
    }
    // Create a new location
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locationsData = req.body; // Expecting an array of location data
                const newLocations = [];
                for (const locationData of locationsData) {
                    // Check if the location already exists by name or address (you can choose your own criteria)
                    const existingLocation = yield LocationService_1.LocationService.getByName(locationData.name);
                    if (existingLocation) {
                        // If it exists, throw an error
                        throw new Error(`Record already exists for location: ${locationData.name}`);
                    }
                    // If it doesn't exist, create a new one
                    const newLocation = yield LocationService_1.LocationService.create(locationData);
                    newLocations.push(newLocation);
                }
                res.status(201).json({ message: "Created Successfully", data: newLocations });
            }
            catch (error) {
                res.status(400).send({ message: 'Error creating locations', error: error.message });
            }
        });
    }
    // Update location by ID
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Convert id to a number
                const numericId = parseInt(id, 10);
                // Check if the id is a valid number
                if (isNaN(numericId)) {
                    return res.status(400).json({ message: 'Invalid ID format' });
                }
                const updatedLocation = yield LocationService_1.LocationService.update(numericId, req.body);
                if (!updatedLocation) {
                    return res.status(404).send({ message: 'Location not found' });
                }
                res.status(200).send(updatedLocation);
            }
            catch (error) {
                res.status(400).send({ message: 'Error updating location', error: error.message });
            }
        });
    }
    // Delete location by ID
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Convert id to a number
                const numericId = parseInt(id, 10);
                // Check if the id is a valid number
                if (isNaN(numericId)) {
                    return res.status(400).json({ message: 'Invalid ID format' });
                }
                yield LocationService_1.LocationService.delete(numericId);
                res.status(204).send();
            }
            catch (error) {
                res.status(404).send({ message: 'Error deleting location', error: error.message });
            }
        });
    }
}
exports.LocationController = LocationController;
