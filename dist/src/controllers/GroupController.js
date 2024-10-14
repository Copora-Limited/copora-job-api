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
const groupService = new GroupService_1.GroupService();
class GroupController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const groups = yield groupService.getAll();
            res.json(groups);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const group = yield groupService.getById(id);
            if (group) {
                res.json(group);
            }
            else {
                res.status(404).json({ message: 'Group not found' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupData = req.body;
            const newGroup = yield groupService.create(groupData);
            res.status(201).json(newGroup);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const groupData = req.body;
            const updatedGroup = yield groupService.update(id, groupData);
            if (updatedGroup) {
                res.json(updatedGroup);
            }
            else {
                res.status(404).json({ message: 'Group not found' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield groupService.delete(id);
            res.status(204).send();
        });
    }
}
exports.GroupController = GroupController;
