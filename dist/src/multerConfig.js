"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// Define memory storage configuration to store files in memory as buffers
const storage = multer_1.default.memoryStorage();
// Allowed MIME types for documents and images
const allowedFileTypes = [
    "application/pdf", // PDF
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    "application/msword", // DOC
    "image/jpeg", // JPEG images
    "image/png" // PNG images
];
// Multer upload configuration for both documents and images
const uploadDocumentsAndImages = (0, multer_1.default)({
    storage: storage, // Use memory storage to save the files as buffers
    fileFilter: (req, file, cb) => {
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true); // Accept the file, no error
        }
        else {
            cb(null, false);
            console.error('Invalid file type. Only specific document and image files are allowed.');
        }
    }
});
exports.default = uploadDocumentsAndImages;
// https://copora-candidates.lon1.digitaloceanspaces.com/certificates/certificates/2524ad30-Invoice_ISS-1080_2024-10-29%20(1).pdf
// https://copora-candidates.lon1.digitaloceanspaces.com/certificates/2524ad30-Invoice_ISS-1080_2024-10-29 (1).pdf
