import { NextOfKin } from '../entities/NextOfKinEntity';
import { AppDataSource } from '../data-source';

const NextOfKinRepository = AppDataSource.getRepository(NextOfKin);

export class NextOfKinService {
    // Create new NextOfKin
    static async createNextOfKin(data: Partial<NextOfKin>): Promise<NextOfKin> {
        const NextOfKin = NextOfKinRepository.create(data);
        return await NextOfKinRepository.save(NextOfKin);
    }

    // Get NextOfKin by applicationNo
    static async getNextOfKinByApplicationNo(applicationNo: string): Promise<NextOfKin | null> {
        return await NextOfKinRepository.findOneBy({ applicationNo });
    }

    // Update NextOfKin by applicationNo
    static async updateNextOfKinByApplicationNo(applicationNo: string, data: Partial<NextOfKin>): Promise<NextOfKin | null> {
        await NextOfKinRepository.update({ applicationNo }, data);
        return await NextOfKinRepository.findOneBy({ applicationNo });
    }

    // Delete NextOfKin by applicationNo
    static async deleteNextOfKinByApplicationNo(applicationNo: string): Promise<string> {
        const result = await NextOfKinRepository.delete({ applicationNo });
        if (result.affected === 0) {
            throw new Error('Contact Details not found');
        }
        return 'Contact Details deleted';
    }
}
