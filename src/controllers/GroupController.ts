import { Request, Response } from 'express';
import { GroupService } from '../services/GroupService';

const groupService = new GroupService();

export class GroupController {
    async getAll(req: Request, res: Response) {
        const groups = await groupService.getAll();
        res.json(groups);
    }

    async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const group = await groupService.getById(id);
        if (group) {
            res.json(group);
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    }

    async create(req: Request, res: Response) {
        const groupData = req.body;
        const newGroup = await groupService.create(groupData);
        res.status(201).json(newGroup);
    }

    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const groupData = req.body;
        const updatedGroup = await groupService.update(id, groupData);
        if (updatedGroup) {
            res.json(updatedGroup);
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    }

    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await groupService.delete(id);
        res.status(204).send();
    }
}
