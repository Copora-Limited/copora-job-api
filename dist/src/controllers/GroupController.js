"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupController = void 0;
const GroupService_1 = require("../services/GroupService");
class GroupController {
    // Get all groups
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield GroupService_1.GroupService.getAll();
                res.status(200).json(groups);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching groups', error: error.message });
            }
        });
    }
    // Get group by ID
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const numericId = parseInt(id, 10);
                if (isNaN(numericId)) {
                    return res.status(400).json({ message: 'Invalid ID format' });
                }
                const group = yield GroupService_1.GroupService.getById(numericId);
                if (!group) {
                    return res.status(404).json({ message: 'Group not found' });
                }
                res.status(200).json(group);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching group', error: error.message });
            }
        });
    }
    // Create a new group
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupData = req.body;
                const newGroup = yield GroupService_1.GroupService.create(groupData);
                res.status(201).json(newGroup);
            }
            catch (error) {
                res.status(400).json({ message: 'Error creating group', error: error.message });
            }
        });
    }
    // Update group by ID
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const numericId = parseInt(id, 10);
                if (isNaN(numericId)) {
                    return res.status(400).json({ message: 'Invalid ID format' });
                }
                const updatedGroup = yield GroupService_1.GroupService.update(numericId, req.body);
                if (!updatedGroup) {
                    return res.status(404).json({ message: 'Group not found' });
                }
                res.status(200).json(updatedGroup);
            }
            catch (error) {
                res.status(400).json({ message: 'Error updating group', error: error.message });
            }
        });
    }
    // Delete group by ID
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const numericId = parseInt(id, 10);
                if (isNaN(numericId)) {
                    return res.status(400).json({ message: 'Invalid ID format' });
                }
                yield GroupService_1.GroupService.delete(numericId);
                res.status(204).send();
            }
            catch (error) {
                res.status(404).json({ message: 'Error deleting group', error: error.message });
            }
        });
    }
}
exports.GroupController = GroupController;
