import { AppDataSource } from '../data-source';
import { Reference } from '../entities/ReferenceEntity';

const referenceRepository = AppDataSource.getRepository(Reference);

export class ReferenceService {
    // Create or update Reference
    static async create(data: any) {
        const entry = referenceRepository.create(data);
        return await referenceRepository.save(entry);
    }

    static async createOrUpdate(data: Partial<Reference>): Promise<Reference> {
        const { applicationNo } = data;
        let reference = await referenceRepository.findOneBy({ applicationNo });

        if (reference) {
            // Update existing reference
            Object.assign(reference, data);
            return await referenceRepository.save(reference);
        } else {
            // Create new reference
            reference = referenceRepository.create(data);
            return await referenceRepository.save(reference);
        }
    }

    // Get Reference by applicationNo
    static async getByApplicationNo(applicationNo: string): Promise<Reference | null> {
        return await referenceRepository.findOneBy({ applicationNo });
    }

    static async getAllByApplicationNo(applicationNo: string): Promise<Reference[]> {
        return await referenceRepository.find({ where: { applicationNo } });
    }
    

    // Update Reference by applicationNo
    static async updateByApplicationNo(applicationNo: string, data: Partial<Reference>): Promise<Reference | null> {
        let reference = await this.getByApplicationNo(applicationNo);
        if (!reference) {
            throw new Error('Reference not found');
        }
        Object.assign(reference, data);
        return await referenceRepository.save(reference);
    }

    // Delete Reference by applicationNo
    static async deleteByApplicationNoAndId(applicationNo: string, id: number): Promise<string> {
        const result = await referenceRepository.delete({ applicationNo, id });
        if (result.affected === 0) {
            throw new Error('Reference not found');
        }
        return 'Reference deleted';
    }
    

    static async findByApplicationNoAndPhone(applicationNo: string, phone: string, email: string): Promise<Reference | null> {
        try {
            // Find the reference details by applicationNo and phone
            const entry = await referenceRepository.findOne({
                where: {
                    applicationNo,
                    phone,
                    email
                }
            });
    
            return entry || null; // Return null if entry is not found
        } catch (error) {
            console.error('Error finding reference details by applicationNo and phone:', error);
            throw new Error('Error retrieving reference details');
        }
    }
    


    static async update(id: number, data: Partial<Reference>): Promise<Reference| null> {
        try {
            const entry = await referenceRepository.findOneBy({ id });
            if (entry) {
            Object.assign(entry, data);
            return await referenceRepository.save(entry);
            }
            return null;
        } catch (error) {
            console.error('Error updating professional details:', error);
            throw new Error('Error updating professional details');
        }
    }
}
