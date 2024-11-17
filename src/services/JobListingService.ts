import { AppDataSource } from '../data-source';
import { JobListing } from '../entities/JobListingEntity';
import { Location } from '../entities/LocationEntity';
import { EmploymentType } from '../entities/EmploymentTypeEntity';
import { Group } from '../entities/GroupEntity';
import { JobTitle } from '../entities/JobTitleEntity';


const jobListingRepository = AppDataSource.getRepository(JobListing);
export class JobListingService {

    static async findByApplicationNo(applicationNo: string) {
        return await jobListingRepository.findOneBy({ applicationNo });
    }
    static async getAll() {
        return await jobListingRepository.find();
    }

    static async getAllTags() {
        try {
            // Fetch details for each tag
            const location = await AppDataSource.getRepository(Location).find();
            const group = await AppDataSource.getRepository(Group).find();
            const employmentType = await AppDataSource.getRepository(EmploymentType).find();
            const jobTitle = await AppDataSource.getRepository(JobTitle).find();
    
            // Organize data into an object with labeled properties
            const result = {
                location: location || [], // If empty, return an empty array
                group: group || [],
                employmentType: employmentType || [],
                jobTitle: jobTitle || [],
            };
    
            return result;
        } catch (error) {
            throw new Error(`Error retrieving all tags: ${error.message}`);
        }
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


    // static async getAllTags() {
    //     try {
    //       // Fetch details for each tag
    //       const location = await AppDataSource.getRepository(Location).find();
    //       const group = await AppDataSource.getRepository(Group).find();
    //       const employmentType = await AppDataSource.getRepository(EmploymentType).find();
    //       const jobTitle = await AppDataSource.getRepository(JobTitle).find();
        
    //       return {
    //         location,
    //         group,
    //         employmentType,
    //         jobTitle
    //       };
    //     } catch (error) {
    //       throw new Error(`Error retrieving all tags: ${error.message}`);
    //     }
    // }


      
      
}
