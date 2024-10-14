import { AppDataSource } from '../data-source';
import { JobTitle } from '../entities/JobTitleEntity';

const jobTitleRepository = AppDataSource.getRepository(JobTitle);

export class JobTitleService {

    static async getByName(name: string) {
        return await jobTitleRepository.findOneBy({ name });
    }

    static async getAll() {
        try {
            return await jobTitleRepository.find();
        } catch (error) {
            throw new Error(`Error fetching job titles: ${error.message}`);
        }
    }

    static async getById(id: number) {
        try {
            return await jobTitleRepository.findOneBy({ id });
        } catch (error) {
            throw new Error(`Error fetching job title with ID ${id}: ${error.message}`);
        }
    }

    static async create(jobTitleData: Partial<JobTitle>) {
        try {
            const jobTitle = jobTitleRepository.create(jobTitleData);
            return await jobTitleRepository.save(jobTitle);
        } catch (error) {
            throw new Error(`Error creating job title: ${error.message}`);
        }
    }

    static async update(id: number, jobTitleData: Partial<JobTitle>) {
        try {
            await jobTitleRepository.update(id, jobTitleData);
            return await this.getById(id);
        } catch (error) {
            throw new Error(`Error updating job title with ID ${id}: ${error.message}`);
        }
    }

    static async delete(id: number) {
        try {
            const result = await jobTitleRepository.delete(id);
            if (result.affected === 0) {
                throw new Error(`Job title with ID ${id} not found`);
            }
            return { message: 'Job title deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting job title with ID ${id}: ${error.message}`);
        }
    }
}
