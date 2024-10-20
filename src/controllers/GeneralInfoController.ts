// src/controllers/GeneralInfoController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { GeneralInfo } from '../entities/GeneralInfoEntity';
import { GeneralInfoService } from '../services/GeneralInfoService';
import { UserService } from '../services/UserService';
import uploadDocumentsAndImages from '../multerConfig'; // Import multer config
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class GeneralInfoController {
    // private generalInfoRepository = AppDataSource.getRepository(GeneralInfo);

    // Helper function to upload files to Cloudinary
    static async uploadFile(file: Express.Multer.File | undefined): Promise<string> {
        if (!file) return '';

        try {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url; // Return the secure URL of the uploaded file
        } catch (error) {
            console.error('Error uploading file:', error);
            throw new Error('Failed to upload file');
        }
    }


    // Create or update General Info
    static async createOrUpdateGeneralInfo(req: Request, res: Response) {
        const { generalInfo } = req.body; // Extract generalInfo from request body
        console.log(generalInfo);
        const { applicationNo, level2FoodHygieneCertificateUpload, personalLicenseCertificateUpload, dbsCertificateUpload } = generalInfo;

        // Check if applicant exists
        const existingApplicant = await UserService.findApplicationNo(applicationNo);
        if (!existingApplicant) {
            return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
        }

        // Check if general info for the application already exists
        const existingEntry = await GeneralInfoService.getByApplicationNo(applicationNo);

        // Upload files if they are provided and set their URLs
        const level2FoodHygieneCertificateUrl = await GeneralInfoController.uploadFile(level2FoodHygieneCertificateUpload?.[0]);
        const personalLicenseCertificateUrl = await GeneralInfoController.uploadFile(personalLicenseCertificateUpload?.[0]);
        const dbsCertificateUrl = await GeneralInfoController.uploadFile(dbsCertificateUpload?.[0]);

        // Merge the new data with existing data, only updating fields that are provided
        const dataToSave = {
            ...existingEntry, // Retain existing fields
            ...generalInfo, // Override fields with the new values from req.body
            level2FoodHygieneCertificateUpload: level2FoodHygieneCertificateUrl || existingEntry?.level2FoodHygieneCertificateUpload,
            personalLicenseCertificateUpload: personalLicenseCertificateUrl || existingEntry?.personalLicenseCertificateUpload,
            dbsCertificateUpload: dbsCertificateUrl || existingEntry?.dbsCertificateUpload,
        };


        if (existingEntry) {
            // Update the existing record
            const updatedEntry = await GeneralInfoService.updateByApplicationNo(applicationNo, dataToSave);
            res.status(200).json({ message: 'General Info details updated', data: updatedEntry });
        } else {
            // Create a new record
            const newEntry = await GeneralInfoService.create(dataToSave);
            res.status(201).json({ message: 'General Info details created', data: newEntry });
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
