import { ProfessionalDetails } from '../entities/ProfessionalDetailsEntity';
import { AppDataSource } from '../data-source';

const professionalDetailsRepository = AppDataSource.getRepository(ProfessionalDetails);

export class ProfessionalDetailsService {
    // Create a new ProfessionalDetails Service entry
    static async create(data: any) {
        const entry = professionalDetailsRepository.create(data);
        return await professionalDetailsRepository.save(entry);
    }

    // Get all ProfessionalDetails entries
    static async getAll() {
        return await professionalDetailsRepository.find();
    }

    // Get ProfessionalDetails entry by applicationNo
    static async getByApplicationNo(applicationNo: string) {
        return await professionalDetailsRepository.findOneBy({ applicationNo });
    }

    // Update ProfessionalDetails entry by applicationNo
    static async updateByApplicationNo(applicationNo: string, data: any) {
        const entry = await this.getByApplicationNo(applicationNo);
        if (!entry) {
            throw new Error('Professional details not found');
        }
        Object.assign(entry, data);
        return await professionalDetailsRepository.save(entry);
    }

    // Delete ProfessionalDetails entry by applicationNo
    static async deleteByApplicationNo(applicationNo: string) {
        const result = await professionalDetailsRepository.delete({ applicationNo });
        if (result.affected === 0) {
            throw new Error('Professional details not found');
        }
        return 'Professional details deleted';
    }


    static async findByReferenceContactPhone(referenceContactPhone: string): Promise<ProfessionalDetails | null> {
        try {
            // Find the professional details by referenceContactPhone
            const entry = await professionalDetailsRepository.findOne({
                where: { referenceContactPhone }
            });
      
            return entry || null; // Return null if entry is not found
        } catch (error) {
            console.error('Error finding professional details by referenceContactPhone:', error);
            throw new Error('Error retrieving professional details');
        }
    }

    static async update(id: number, data: Partial<ProfessionalDetails>): Promise<ProfessionalDetails | null> {
        try {
            const entry = await professionalDetailsRepository.findOneBy({ id });
            if (entry) {
            Object.assign(entry, data);
            return await professionalDetailsRepository.save(entry);
            }
            return null;
        } catch (error) {
            console.error('Error updating professional details:', error);
            throw new Error('Error updating professional details');
        }
    }
}
