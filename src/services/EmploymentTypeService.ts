import { AppDataSource } from '../data-source';
import { EmploymentType } from '../entities/EmploymentTypeEntity';

export class EmploymentTypeService {
    employmentTypeRepository = AppDataSource.getRepository(EmploymentType);

    async getAll() {
        return await this.employmentTypeRepository.find();
    }

    async getById(id: number) {
        return await this.employmentTypeRepository.findOneBy({id});
    }

    async create(employmentTypeData: Partial<EmploymentType>) {
        const employmentType = this.employmentTypeRepository.create(employmentTypeData);
        return await this.employmentTypeRepository.save(employmentType);
    }

    async update(id: number, employmentTypeData: Partial<EmploymentType>) {
        await this.employmentTypeRepository.update(id, employmentTypeData);
        return this.getById(id);
    }

    async delete(id: number) {
        return await this.employmentTypeRepository.delete(id);
    }
}
