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
exports.GroupService = void 0;
const data_source_1 = require("../data-source");
const GroupEntity_1 = require("../entities/GroupEntity");
const groupRepository = data_source_1.AppDataSource.getRepository(GroupEntity_1.Group);
class GroupService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield groupRepository.find();
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield groupRepository.findOneBy({ id });
        });
    }
    static create(groupData) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = groupRepository.create(groupData);
            return yield groupRepository.save(group);
        });
    }
    static update(id, groupData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield groupRepository.update(id, groupData);
            return this.getById(id);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield groupRepository.delete(id);
        });
    }
}
exports.GroupService = GroupService;
