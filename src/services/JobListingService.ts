import { AppDataSource } from '../data-source';
import { JobListing } from '../entities/JobListingEntity';

const jobListingRepository = AppDataSource.getRepository(JobListing);
export class JobListingService {

    static async findByApplicationNo(applicationNo: string) {
        return await jobListingRepository.findOneBy({ applicationNo });
    }
    static async getAll() {
        return await jobListingRepository.find();
    }

    static async getById(id: number) {
        return await jobListingRepository.findOneBy({id});
    }

    static async create(jobListingData: Partial<JobListing>) {
        const jobListing = jobListingRepository.create(jobListingData);
        return await jobListingRepository.save(jobListing);
    }

    static async update(id: number, jobListingData: Partial<JobListing>) {
        await jobListingRepository.update(id, jobListingData);
        return this.getById(id);
    }

    static async delete(id: number) {
        return await jobListingRepository.delete(id);
    }
}
