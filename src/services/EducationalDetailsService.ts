import { EducationalDetails } from '../entities/EducationalDetailsEntity';
import { AppDataSource } from '../data-source';

const educationalDetailsRepository = AppDataSource.getRepository(EducationalDetails);

export class EducationalDetailsService {
    

    // Find educational details by course of study
    static async findByApplicationNoAndCourseOfStudy(applicationNo: string, courseOfStudy: string) {
        try {
            // Find educational details by both applicationNo and courseOfStudy
            return await educationalDetailsRepository.findOne({
                where: {
                    applicationNo,
                    courseOfStudy
                }
            });
        } catch (error) {
            throw new Error(`Error finding educational details by application number and course of study: ${error.message}`);
        }
    }
    

    // Create a new educational detail
    static async create(data: Partial<EducationalDetails>): Promise<EducationalDetails> {
        try {
            const educationalDetail = educationalDetailsRepository.create(data);
            return await educationalDetailsRepository.save(educationalDetail);
        } catch (error) {
            throw new Error(`Error creating educational details: ${error.message}`);
        }
    }

    // Update existing educational detail by id
    static async update(id: number, data: Partial<EducationalDetails>): Promise<EducationalDetails | null> {
        try {
            await educationalDetailsRepository.update(id, data);
            return await educationalDetailsRepository.findOneBy({ id });
        } catch (error) {
            throw new Error(`Error updating educational details: ${error.message}`);
        }
    }

    // Get EducationalDetails by applicationNo
    static async getEducationalDetailsByApplicationNo(applicationNo: string): Promise<EducationalDetails[] | null> {
        try {
            return await educationalDetailsRepository.find({ where: { applicationNo } });
        } catch (error) {
            throw new Error(`Error fetching educational details: ${error.message}`);
        }
    }

     // Update existing educational details by applicationNo
     static async updateEducationalDetailsByApplicationNo(applicationNo: string, data: Partial<EducationalDetails>): Promise<EducationalDetails[]> {
        try {
            // Find existing educational details by applicationNo
            const existingDetails = await educationalDetailsRepository.find({ where: { applicationNo } });

            if (!existingDetails.length) {
                throw new Error('Educational Details not found');
            }

            // Update each entry with the provided data
            const updatedEntries = [];
            for (const detail of existingDetails) {
                const updatedDetail = { ...detail, ...data };
                await educationalDetailsRepository.update(detail.id, updatedDetail);
                updatedEntries.push(await educationalDetailsRepository.findOneBy({ id: detail.id }));
            }

            return updatedEntries;
        } catch (error) {
            throw new Error(`Error updating educational details: ${error.message}`);
        }
    }

    // Delete EducationalDetails by applicationNo and id
    static async deleteEducationalDetailsByApplicationNoAndId(applicationNo: string, id: number): Promise<string> {
        try {
            const result = await educationalDetailsRepository.delete({ applicationNo, id });
            if (result.affected === 0) {
                throw new Error('Educational Details not found');
            }
            return 'Educational Details deleted';
        } catch (error) {
            throw new Error(`Error deleting educational details: ${error.message}`);
        }
    }

}
