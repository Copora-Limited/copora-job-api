import { Request, Response } from 'express';
import { LocationService } from '../services/LocationService';

const locationService = new LocationService();

export class LocationController {
    async getAll(req: Request, res: Response) {
        const locations = await locationService.getAll();
        res.json(locations);
    }

    async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const location = await locationService.getById(id);
        if (location) {
            res.json(location);
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    }

    async create(req: Request, res: Response) {
        const locationData = req.body;
        const newLocation = await locationService.create(locationData);
        res.status(201).json(newLocation);
    }

    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const locationData = req.body;
        const updatedLocation = await locationService.update(id, locationData);
        if (updatedLocation) {
            res.json(updatedLocation);
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    }

    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await locationService.delete(id);
        res.status(204).send();
    }
}
