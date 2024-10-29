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
exports.uploadDocumentToSpace = void 0;
const digitalOceanConfig_1 = require("./digitalOceanConfig"); // Import S3 instance for DigitalOcean Spaces
const lib_storage_1 = require("@aws-sdk/lib-storage");
const uuid_1 = require("uuid");
const stream_1 = require("stream");
// Function to upload a document to DigitalOcean Spaces
const uploadDocumentToSpace = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const uniqueId = (0, uuid_1.v4)().slice(0, 8);
    const fileKey = `${uniqueId}-${file.originalname}`;
    const params = {
        Bucket: process.env.DO_SPACE_NAME,
        Key: fileKey,
        Body: stream_1.Readable.from(file.buffer), // Buffer converted to stream
        ACL: "public-read",
        ContentType: file.mimetype,
    };
    const upload = new lib_storage_1.Upload({
        client: digitalOceanConfig_1.s3,
        params: params,
    });
    yield upload.done();
    const fileUrl = `${process.env.DO_SPACE_ENDPOINT}/${fileKey}`;
    return fileUrl;
});
exports.uploadDocumentToSpace = uploadDocumentToSpace;
