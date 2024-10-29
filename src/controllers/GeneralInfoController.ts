import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { GeneralInfo } from '../entities/GeneralInfoEntity';
import { GeneralInfoService } from '../services/GeneralInfoService';
import { UserService } from '../services/UserService';
import path from 'path';
import fs from 'fs';
import uploadDocumentsAndImages from '../multerConfig';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class GeneralInfoController {
    // Helper function to upload images to Cloudinary
    private static async uploadImageToCloudinary(file: Express.Multer.File): Promise<string> {
        try {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            throw new Error('Failed to upload image');
        }
    }

    // Helper function to save document locally and return the path
    private static async saveDocumentLocally(file: Express.Multer.File): Promise<string> {
        const uploadDir = path.join(__dirname, '../../uploads/certificates');
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

        const filePath = path.join(uploadDir, file.originalname);
        fs.renameSync(file.path, filePath); // Move file to the uploads directory
        return filePath;
    }

    // Helper function to handle file upload based on type
    private static async handleFileUpload(file: Express.Multer.File): Promise<string> {
        const fileExtension = path.extname(file.originalname).toLowerCase();

        // Document file formats
        if (['.pdf', '.doc', '.docx'].includes(fileExtension)) {
            return await GeneralInfoController.saveDocumentLocally(file); // Local path for documents
        } 
        // Image file formats for Cloudinary
        else if (['.jpg', '.jpeg', '.png'].includes(fileExtension)) {
            return await GeneralInfoController.uploadImageToCloudinary(file);
        } else {
            throw new Error('Unsupported file format');
        }
    }

    public static async createOrUpdateGeneralInfo(req: Request, res: Response) {
        try {
            const {
                applicationNo,
                plateWaiting,
                retailCashier,
                barWork,
                hospitality,
                foodService,
                barista,
                supervising,
                level2FoodHygieneCertificate,
                personalLicenseHolder,
                dbsDisclosureAndBarringService,
            } = req.body;

            // Validate applicationNo
            if (!applicationNo) {
                return res.status(400).json({ message: 'Application number is required' });
            }

            // Check if the applicant exists
            const existingApplicant = await UserService.findApplicationNo(applicationNo);
            if (!existingApplicant) {
                return res.status(400).json({ message: 'Applicant does not exist' });
            }

            // Validate required fields
            const requiredFields = [
                { field: plateWaiting, name: 'plate waiting' },
                { field: retailCashier, name: 'retail cashier' },
                { field: barWork, name: 'bar work' },
                { field: hospitality, name: 'hospitality' },
                { field: foodService, name: 'food service' },
                { field: barista, name: 'barista' },
                { field: supervising, name: 'supervising' },
                { field: personalLicenseHolder, name: 'personal license holder' },
                { field: dbsDisclosureAndBarringService, name: 'DBS Disclosure and Barring Service' },
            ];
            for (const { field, name } of requiredFields) {
                if (field === null || field === undefined) {
                    return res.status(400).json({ message: `Please answer Yes or No for ${name} question` });
                }
            }

            // Check if general info for the application already exists
            const existingEntry = await GeneralInfoService.getByApplicationNo(applicationNo);

            // Files from the request (assuming middleware handles file uploads correctly)
            const { level2FoodHygieneCertificateUpload, personalLicenseCertificateUpload, dbsCertificateUpload } = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };

            // Handle file uploads and set URLs
            const level2FoodHygieneCertificateUrl = level2FoodHygieneCertificateUpload?.[0]
                ? await GeneralInfoController.handleFileUpload(level2FoodHygieneCertificateUpload[0])
                : existingEntry?.level2FoodHygieneCertificateUpload;

            const personalLicenseCertificateUrl = personalLicenseCertificateUpload?.[0]
                ? await GeneralInfoController.handleFileUpload(personalLicenseCertificateUpload[0])
                : existingEntry?.personalLicenseCertificateUpload;

            const dbsCertificateUrl = dbsCertificateUpload?.[0]
                ? await GeneralInfoController.handleFileUpload(dbsCertificateUpload[0])
                : existingEntry?.dbsCertificateUpload;

            // Merge data to save with the existing data if present
            const dataToSave = {
                ...existingEntry,
                applicationNo,
                plateWaiting,
                retailCashier,
                barWork,
                hospitality,
                foodService,
                barista,
                supervising,
                level2FoodHygieneCertificate,
                personalLicenseHolder,
                dbsDisclosureAndBarringService,
                level2FoodHygieneCertificateUpload: level2FoodHygieneCertificateUrl,
                personalLicenseCertificateUpload: personalLicenseCertificateUrl,
                dbsCertificateUpload: dbsCertificateUrl,
                attempted: true, // Set attempted to true
            };

            // Save or update record
            if (existingEntry) {
                const updatedEntry = await GeneralInfoService.updateByApplicationNo(applicationNo, dataToSave);
                res.status(200).json({ message: 'General Info details updated', data: updatedEntry });
            } else {
                const newEntry = await GeneralInfoService.create(dataToSave);
                res.status(201).json({ message: 'General Info details created', data: newEntry });
            }
        } catch (error) {
            console.error('Error creating or updating general info:', error);
            res.status(500).json({ message: 'Error creating or updating general info', error: error.message });
        }
    }
    

    // Get GeneralInfo by applicationNo
    static async getGeneralInfoByNo(req: Request, res: Response) {
        console.log("req:", req.params)
        try {
            const { applicationNo } = req.params;
            const entry = await GeneralInfoService.getByApplicationNo(applicationNo);
            console.log("entry:", entry)

            if (!entry) {
                return res.status(404).send({ message: 'Personal details not found' });
            }
            res.status(200).send(entry);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching personal details', error: error.message });
        }
    }

    // Update GeneralInfo by applicationNo
    static async updateGeneralInfoByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const updatedEntry = await GeneralInfoService.updateByApplicationNo(applicationNo, req.body);
            if (!updatedEntry) {
                return res.status(404).send({ message: 'Personal details not found' });
            }
            res.status(200).send(updatedEntry);
        } catch (error) {
            res.status(400).send({ message: 'Error updating personal details', error: error.message });
        }
    }

    // Delete GeneralInfo by applicationNo
    static async deleteGeneralInfoByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const message = await GeneralInfoService.deleteByApplicationNo(applicationNo);
            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
}
