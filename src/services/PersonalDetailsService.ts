import { PersonalDetails } from '../entities/PersonalDetailsEntity';
import { AppDataSource } from '../data-source';

const personalDetailsRepository = AppDataSource.getRepository(PersonalDetails);

export class PersonalDetailsService {
    // Create a new PersonalDetails entry
    static async create(data: any) {
        try {
            const entry = personalDetailsRepository.create(data);
            return await personalDetailsRepository.save(entry);
        } catch (error) {
            console.error('Error creating personal details:', error);
            throw new Error('Error creating personal details');
        }
    }

    // Get all PersonalDetails entries
    static async getAll() {
        try {
            return await personalDetailsRepository.find();
        } catch (error) {
            console.error('Error fetching all personal details:', error);
            throw new Error('Error fetching all personal details');
        }
    }

    // Get PersonalDetails entry by applicationNo
    static async getByApplicationNo(applicationNo: string): Promise<PersonalDetails | null> {
        console.log("here", applicationNo)
        try {
            // const personalDetails = await personalDetailsRepository.findOneBy({ applicationNo });
            const personalDetails = await AppDataSource.getRepository(PersonalDetails).findOneBy({ applicationNo });
            return personalDetails || null;
        } catch (error) {
            console.error('Error fetching personal details by application number:', error);
            throw new Error('Error fetching personal details by application number');
        }
    }

    // Update PersonalDetails entry by applicationNo
    static async updateByApplicationNo(applicationNo: string, data: any) {
        try {
            const entry = await this.getByApplicationNo(applicationNo);
            if (!entry) {
                throw new Error('Personal details not found');
            }
            Object.assign(entry, data);
            return await personalDetailsRepository.save(entry);
        } catch (error) {
            console.error('Error updating personal details:', error);
            throw new Error('Error updating personal details');
        }
    }

    // Delete PersonalDetails entry by applicationNo
    static async deleteByApplicationNo(applicationNo: string) {
        try {
            const result = await personalDetailsRepository.delete({ applicationNo });
            if (result.affected === 0) {
                throw new Error('Personal details not found');
            }
            return 'Personal details deleted';
        } catch (error) {
            console.error('Error deleting personal details:', error);
            throw new Error('Error deleting personal details');
        }
    }
}
