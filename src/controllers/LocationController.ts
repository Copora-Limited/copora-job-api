import { Request, Response } from 'express';
import { LocationService } from '../services/LocationService';

export class LocationController {
    // Get all locations
    static async getAll(req: Request, res: Response) {
        try {
            const locations = await LocationService.getAll();
            res.status(200).json(locations);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching locations', error: error.message });
        }
    }

    // Get location by ID
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            // Convert id to a number
            const numericId = parseInt(id, 10);
            
            // Check if the id is a valid number
            if (isNaN(numericId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            const location = await LocationService.getById(numericId);
            if (!location) {
                return res.status(404).send({ message: 'Location not found' });
            }
            res.status(200).send(location);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching location', error: error.message });
        }
    }

    // Create a new location

    static async create(req: Request, res: Response) {
        try {
            const locationsData = req.body; // Expecting an array of location data
            const newLocations = [];
    
            for (const locationData of locationsData) {
                // Check if the location already exists by name or address (you can choose your own criteria)
                const existingLocation = await LocationService.getByName(locationData.name);
    
                if (existingLocation) {
                    // If it exists, throw an error
                    throw new Error(`Record already exists for location: ${locationData.name}`);
                }
    
                // If it doesn't exist, create a new one
                const newLocation = await LocationService.create(locationData);
                newLocations.push(newLocation);
            }
    
            res.status(201).json({ message: "Created Successfully", data: newLocations });
        } catch (error) {
            res.status(400).send({ message: 'Error creating locations', error: error.message });
        }
    }
    

    // Update location by ID
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;

            // Convert id to a number
            const numericId = parseInt(id, 10);
            
            // Check if the id is a valid number
            if (isNaN(numericId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            const updatedLocation = await LocationService.update(numericId, req.body);
            if (!updatedLocation) {
                return res.status(404).send({ message: 'Location not found' });
            }

            res.status(200).send(updatedLocation);
        } catch (error) {
            res.status(400).send({ message: 'Error updating location', error: error.message });
        }
    }

    // Delete location by ID
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            // Convert id to a number
            const numericId = parseInt(id, 10);
            
            // Check if the id is a valid number
            if (isNaN(numericId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            await LocationService.delete(numericId);
            res.status(204).send();
        } catch (error) {
            res.status(404).send({ message: 'Error deleting location', error: error.message });
        }
    }
}
