import { AppDataSource } from '../data-source';
import { JobTitle } from '../entities/JobTitleEntity';

export class JobTitleService {
    jobTitleRepository = AppDataSource.getRepository(JobTitle);

    async getAll() {
        return await this.jobTitleRepository.find();
    }

    async getById(id: number) {
        return await this.jobTitleRepository.findOneBy({id});
    }

    async create(jobTitleData: Partial<JobTitle>) {
        const jobTitle = this.jobTitleRepository.create(jobTitleData);
        return await this.jobTitleRepository.save(jobTitle);
    }

    async update(id: number, jobTitleData: Partial<JobTitle>) {
        await this.jobTitleRepository.update(id, jobTitleData);
        return this.getById(id);
    }

    async delete(id: number) {
        return await this.jobTitleRepository.delete(id);
    }
}
