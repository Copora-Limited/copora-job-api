import { AppDataSource } from '../data-source';
import { Group } from '../entities/GroupEntity';

const groupRepository = AppDataSource.getRepository(Group);

export class GroupService {

    static async getByName(name: string) {
        return await groupRepository.findOneBy({ name });
    }
    
    static async getAll() {
        return await groupRepository.find();
    }

    static async getById(id: number) {
        return await groupRepository.findOneBy({ id });
    }

    static async create(groupData: Partial<Group>) {
        const group = groupRepository.create(groupData);
        return await groupRepository.save(group);
    }

    static async update(id: number, groupData: Partial<Group>) {
        await groupRepository.update(id, groupData);
        return this.getById(id);
    }

    static async delete(id: number) {
        return await groupRepository.delete(id);
    }
}
