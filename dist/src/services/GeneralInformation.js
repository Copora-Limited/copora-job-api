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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceService = void 0;
var data_source_1 = require("../data-source");
var ReferenceEntity_1 = require("../entities/ReferenceEntity");
var referenceRepository = data_source_1.AppDataSource.getRepository(ReferenceEntity_1.Reference);
var ReferenceService = /** @class */ (function () {
    function ReferenceService() {
    }
    // Create or update Reference
    ReferenceService.createOrUpdate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, reference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        applicationNo = data.applicationNo;
                        return [4 /*yield*/, referenceRepository.findOneBy({ applicationNo: applicationNo })];
                    case 1:
                        reference = _a.sent();
                        if (!reference) return [3 /*break*/, 3];
                        // Update existing reference
                        Object.assign(reference, data);
                        return [4 /*yield*/, referenceRepository.save(reference)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        // Create new reference
                        reference = referenceRepository.create(data);
                        return [4 /*yield*/, referenceRepository.save(reference)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Get Reference by applicationNo
    ReferenceService.getByApplicationNo = function (applicationNo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, referenceRepository.findOneBy({ applicationNo: applicationNo })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Update Reference by applicationNo
    ReferenceService.updateByApplicationNo = function (applicationNo, data) {
        return __awaiter(this, void 0, void 0, function () {
            var reference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getByApplicationNo(applicationNo)];
                    case 1:
                        reference = _a.sent();
                        if (!reference) {
                            throw new Error('Reference not found');
                        }
                        Object.assign(reference, data);
                        return [4 /*yield*/, referenceRepository.save(reference)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Delete Reference by applicationNo
    ReferenceService.deleteByApplicationNo = function (applicationNo) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, referenceRepository.delete({ applicationNo: applicationNo })];
                    case 1:
                        result = _a.sent();
                        if (result.affected === 0) {
                            throw new Error('Reference not found');
                        }
                        return [2 /*return*/, 'Reference deleted'];
                }
            });
        });
    };
    return ReferenceService;
}());
exports.ReferenceService = ReferenceService;
