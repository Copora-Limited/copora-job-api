import { GeneralInfo } from '../entities/GeneralInfoEntity';
import { AppDataSource } from '../data-source';

const generalInfoRepository = AppDataSource.getRepository(GeneralInfo);

export class GeneralInfoService {
    // Create a new PersonalDetails entry
    static async create(data: any) {
        const entry = generalInfoRepository.create(data);
        return await generalInfoRepository.save(entry);
    }

    // Get all PersonalDetails entries
    static async getAll() {
        return await generalInfoRepository.find();
    }

    // Get PersonalDetails entry by applicationNo
    static async getByApplicationNo(applicationNo: string) {
        return await generalInfoRepository.findOneBy({ applicationNo });
    }

    // Update PersonalDetails entry by applicationNo
    static async updateByApplicationNo(applicationNo: string, data: any) {
        const entry = await this.getByApplicationNo(applicationNo);
        if (!entry) {
            throw new Error('General details not found');
        }
        Object.assign(entry, data);
        return await generalInfoRepository.save(entry);
    }

    // Delete PersonalDetails entry by applicationNo
    static async deleteByApplicationNo(applicationNo: string) {
        const result = await generalInfoRepository.delete({ applicationNo });
        if (result.affected === 0) {
            throw new Error('General details not found');
        }
        return 'General details deleted';
    }
}
