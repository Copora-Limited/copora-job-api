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
exports.EmploymentTypeController = void 0;
const EmploymentTypeService_1 = require("../services/EmploymentTypeService");
const employmentTypeService = new EmploymentTypeService_1.EmploymentTypeService();
class EmploymentTypeController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employmentTypes = yield employmentTypeService.getAll();
            res.json(employmentTypes);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const employmentType = yield employmentTypeService.getById(id);
            if (employmentType) {
                res.json(employmentType);
            }
            else {
                res.status(404).json({ message: 'Employment Type not found' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employmentTypeData = req.body;
            const newEmploymentType = yield employmentTypeService.create(employmentTypeData);
            res.status(201).json(newEmploymentType);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const employmentTypeData = req.body;
            const updatedEmploymentType = yield employmentTypeService.update(id, employmentTypeData);
            if (updatedEmploymentType) {
                res.json(updatedEmploymentType);
            }
            else {
                res.status(404).json({ message: 'Employment Type not found' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield employmentTypeService.delete(id);
            res.status(204).send();
        });
    }
}
exports.EmploymentTypeController = EmploymentTypeController;
