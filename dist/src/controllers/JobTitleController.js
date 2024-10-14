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
exports.JobTitleController = void 0;
const JobTitleService_1 = require("../services/JobTitleService");
const jobTitleService = new JobTitleService_1.JobTitleService();
class JobTitleController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobTitles = yield jobTitleService.getAll();
            res.json(jobTitles);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const jobTitle = yield jobTitleService.getById(id);
            if (jobTitle) {
                res.json(jobTitle);
            }
            else {
                res.status(404).json({ message: 'Job Title not found' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobTitleData = req.body;
            const newJobTitle = yield jobTitleService.create(jobTitleData);
            res.status(201).json(newJobTitle);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const jobTitleData = req.body;
            const updatedJobTitle = yield jobTitleService.update(id, jobTitleData);
            if (updatedJobTitle) {
                res.json(updatedJobTitle);
            }
            else {
                res.status(404).json({ message: 'Job Title not found' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield jobTitleService.delete(id);
            res.status(204).send();
        });
    }
}
exports.JobTitleController = JobTitleController;
