import { AppDataSource } from '../data-source';
import { EmploymentType } from '../entities/EmploymentTypeEntity';

const employmentTypeRepository = AppDataSource.getRepository(EmploymentType);
export class EmploymentTypeService {

    static async getByName(name: string) {
        return await employmentTypeRepository.findOneBy({ name });
    }
    static async getAll() {
        return await employmentTypeRepository.find();
    }

    static async getById(id: number) {
        return await employmentTypeRepository.findOneBy({id});
    }

    static async create(employmentTypeData: Partial<EmploymentType>) {
        const employmentType = employmentTypeRepository.create(employmentTypeData);
        return await employmentTypeRepository.save(employmentType);
    }

    static async update(id: number, employmentTypeData: Partial<EmploymentType>) {
        await employmentTypeRepository.update(id, employmentTypeData);
        return this.getById(id);
    }

    static async delete(id: number) {
        return await employmentTypeRepository.delete(id);
    }
}
