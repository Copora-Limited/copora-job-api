"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Define storage configuration to store files on disk
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${path_1.default.extname(file.originalname)}`);
    }
});
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
    storage: storage, // Use disk storage to save the files
    fileFilter: (req, file, cb) => {
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true); // Accept the file, no error
        }
        else {
            // Reject the file, pass 'null' for no error and 'false' to reject the file
            cb(null, false);
            // Optionally, log an error message for the rejected file type
            console.error('Invalid file type. Only specific document and image files are allowed.');
        }
    }
});
exports.default = uploadDocumentsAndImages;
