import { AppDataSource } from '../data-source';
import { Group } from '../entities/GroupEntity';

export class GroupService {
    groupRepository = AppDataSource.getRepository(Group);

    async getAll() {
        return await this.groupRepository.find();
    }

    async getById(id: number) {
        return await this.groupRepository.findOneBy({id});
    }

    async create(groupData: Partial<Group>) {
        const group = this.groupRepository.create(groupData);
        return await this.groupRepository.save(group);
    }

    async update(id: number, groupData: Partial<Group>) {
        await this.groupRepository.update(id, groupData);
        return this.getById(id);
    }

    async delete(id: number) {
        return await this.groupRepository.delete(id);
    }
}
