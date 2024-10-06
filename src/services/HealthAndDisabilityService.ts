import { HealthAndDisability } from '../entities/HealthAndDisabilityEntity';
import { AppDataSource } from '../data-source';

const healthAndDisabilityRepository = AppDataSource.getRepository(HealthAndDisability);

export class HealthAndDisabilityService {
    // Create a new HealthAndDisability entry
    static async create(data: any) {
        const entry = healthAndDisabilityRepository.create(data);
        return await healthAndDisabilityRepository.save(entry);
    }

    // Get all HealthAndDisability entries
    static async getAll() {
        return await healthAndDisabilityRepository.find();
    }

    // Get HealthAndDisability entry by applicationNo
    static async getByApplicationNo(applicationNo: string) {
        return await healthAndDisabilityRepository.findOneBy({ applicationNo });
    }

    // Update HealthAndDisability entry by applicationNo
    static async updateByApplicationNo(applicationNo: string, data: any) {
        const entry = await this.getByApplicationNo(applicationNo);
        if (!entry) {
            throw new Error('Health and Disability entry not found');
        }
        Object.assign(entry, data);
        return await healthAndDisabilityRepository.save(entry);
    }

    // Delete HealthAndDisability entry by applicationNo
    static async deleteByApplicationNo(applicationNo: string) {
        const result = await healthAndDisabilityRepository.delete({ applicationNo });
        if (result.affected === 0) {
            throw new Error('Health and Disability entry not found');
        }
        return 'Health and Disability entry deleted';
    }
}
