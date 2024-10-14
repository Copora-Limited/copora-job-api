import { AppDataSource } from '../data-source';
import { Location } from '../entities/LocationEntity';

export class LocationService {
    locationRepository = AppDataSource.getRepository(Location);

    async getAll() {
        return await this.locationRepository.find();
    }

    async getById(id: number) {
        return await this.locationRepository.findOneBy({id});
    }

    async create(locationData: Partial<Location>) {
        const location = this.locationRepository.create(locationData);
        return await this.locationRepository.save(location);
    }

    async update(id: number, locationData: Partial<Location>) {
        await this.locationRepository.update(id, locationData);
        return this.getById(id);
    }

    async delete(id: number) {
        return await this.locationRepository.delete(id);
    }
}
