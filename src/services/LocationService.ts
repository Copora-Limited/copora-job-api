import { AppDataSource } from '../data-source';
import { Location } from '../entities/LocationEntity';

const locationRepository = AppDataSource.getRepository(Location);

export class LocationService {
    static async getAll() {
        return await locationRepository.find();
    }

    static async getById(id: number) {
        return await locationRepository.findOneBy({ id });
    }

    static async create(locationData: Partial<Location>) {
        const location = locationRepository.create(locationData);
        return await locationRepository.save(location);
    }

    static async update(id: number, locationData: Partial<Location>) {
        await locationRepository.update(id, locationData);
        return this.getById(id);
    }

    static async delete(id: number) {
        return await locationRepository.delete(id);
    }
}
