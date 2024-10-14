import { Request, Response } from 'express';
import { GroupService } from '../services/GroupService';

export class GroupController {
    // Get all groups
    static async getAll(req: Request, res: Response) {
        try {
            const groups = await GroupService.getAll();
            res.status(200).json(groups);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching groups', error: error.message });
        }
    }

    // Get group by ID
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numericId = parseInt(id, 10);

            if (isNaN(numericId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            const group = await GroupService.getById(numericId);
            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }
            res.status(200).json(group);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching group', error: error.message });
        }
    }

    // Create a new group
    static async create(req: Request, res: Response) {
        try {
            const groupsData = req.body; // Expecting an array of group data
            const newGroups = [];

            for (const groupData of groupsData) {
                const newGroup = await GroupService.create(groupData);
                newGroups.push(newGroup);
            }

            res.status(201).json(newGroups);
        } catch (error) {
            res.status(400).json({ message: 'Error creating groups', error: error.message });
        }
    }

    // Update group by ID
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numericId = parseInt(id, 10);

            if (isNaN(numericId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            const updatedGroup = await GroupService.update(numericId, req.body);
            if (!updatedGroup) {
                return res.status(404).json({ message: 'Group not found' });
            }
            res.status(200).json(updatedGroup);
        } catch (error) {
            res.status(400).json({ message: 'Error updating group', error: error.message });
        }
    }

    // Delete group by ID
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numericId = parseInt(id, 10);

            if (isNaN(numericId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            await GroupService.delete(numericId);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: 'Error deleting group', error: error.message });
        }
    }
}
