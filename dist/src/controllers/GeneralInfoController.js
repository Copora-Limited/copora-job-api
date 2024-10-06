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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralInfoController = void 0;
const data_source_1 = require("../data-source");
const GeneralInfoEntity_1 = require("../entities/GeneralInfoEntity");
const GeneralInfoService_1 = require("../services/GeneralInfoService");
const UserService_1 = require("../services/UserService");
const multerConfig_1 = __importDefault(require("../multerConfig")); // Import multer config
class GeneralInfoController {
    constructor() {
        this.generalInfoRepository = data_source_1.AppDataSource.getRepository(GeneralInfoEntity_1.GeneralInfo);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Use Multer middleware to handle file uploads
            multerConfig_1.default.fields([
                { name: 'level2FoodHygieneCertificateUpload', maxCount: 1 },
                { name: 'personalLicenseCertificateUpload', maxCount: 1 },
                { name: 'dbsCertificateUpload', maxCount: 1 }
            ])(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                if (err) {
                    return res.status(400).json({ statusCode: 400, message: 'File upload error', error: err.message });
                }
                const { applicationNo } = req.body;
                // Check if applicant exists
                const existingApplicant = yield UserService_1.UserService.findApplicationNo(applicationNo);
                if (!existingApplicant) {
                    return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
                }
                // Check if general info for the application already exists
                const existingEntry = yield GeneralInfoService_1.GeneralInfoService.getByApplicationNo(applicationNo);
                // Prepare file paths if files are uploaded
                const level2FoodHygieneCertificateUpload = ((_c = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a['level2FoodHygieneCertificateUpload']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.path) || null;
                const personalLicenseCertificateUpload = ((_f = (_e = (_d = req.files) === null || _d === void 0 ? void 0 : _d['personalLicenseCertificateUpload']) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.path) || null;
                const dbsCertificateUpload = ((_j = (_h = (_g = req.files) === null || _g === void 0 ? void 0 : _g['dbsCertificateUpload']) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.path) || null;
                const generalInfoData = Object.assign(Object.assign({}, req.body), { level2FoodHygieneCertificateUpload,
                    personalLicenseCertificateUpload,
                    dbsCertificateUpload });
                // Update existing entry or create a new one
                if (existingEntry) {
                    const updatedEntry = yield GeneralInfoService_1.GeneralInfoService.updateByApplicationNo(applicationNo, generalInfoData);
                    return res.status(200).json({ message: 'General Info updated', data: updatedEntry });
                }
                else {
                    const newEntry = this.generalInfoRepository.create(generalInfoData);
                    const savedEntry = yield this.generalInfoRepository.save(newEntry);
                    return res.status(201).json({ message: 'General Info created', data: savedEntry });
                }
            }));
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const generalInfo = yield this.generalInfoRepository.find();
            res.status(200).send(generalInfo);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const generalInfo = yield this.generalInfoRepository.findOneBy({ id: parseInt(req.params.id) });
            if (!generalInfo) {
                return res.status(404).send('General Info not found');
            }
            res.status(200).send(generalInfo);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const generalInfo = yield this.generalInfoRepository.findOneBy({ id: parseInt(req.params.id) });
            if (!generalInfo) {
                return res.status(404).send('General Info not found');
            }
            Object.assign(generalInfo, req.body);
            yield this.generalInfoRepository.save(generalInfo);
            res.status(200).send(generalInfo);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.generalInfoRepository.delete({ id: parseInt(req.params.id) });
            if (result.affected === 0) {
                return res.status(404).send('General Info not found');
            }
            res.status(200).send('General Info deleted');
        });
    }
}
exports.GeneralInfoController = GeneralInfoController;
