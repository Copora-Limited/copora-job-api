import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { GeneralInfo } from '../entities/GeneralInfoEntity';
import { GeneralInfoService } from '../services/GeneralInfoService';
import { UserService } from '../services/UserService';
import path from 'path';
import fs from 'fs';
import { s3 } from '../config/digitalOceanConfig'; // Import S3 instance for DigitalOcean Spaces
import { v4 as uuidv4 } from 'uuid'; // For generating unique file names

export class GeneralInfoController {
    // Helper function to upload document to DigitalOcean Spaces
    private static async uploadDocumentToSpace(file: Express.Multer.File): Promise<string> {
        const fileKey = `uploads/certificates/${uuidv4()}-${file.originalname}`;

        try {
            const params = {
                Bucket: process.env.DO_SPACE_NAME, // Your Space name
                Key: fileKey,
                Body: file.buffer,
                ACL: 'public-read', // Make file public
                ContentType: file.mimetype,
            };

            const { Location } = await s3.upload(params).promise();
            return Location; // URL to access the uploaded document
        } catch (error) {
            console.error('Error uploading file to DigitalOcean:', error);
            throw new Error('Failed to upload document');
        }
    }

    // Helper function to handle file upload based on type
    private static async handleFileUpload(file: Express.Multer.File): Promise<string> {
        const fileExtension = path.extname(file.originalname).toLowerCase();

        // Check for supported document formats
        if (['.pdf', '.doc', '.docx'].includes(fileExtension)) {
            return await GeneralInfoController.uploadDocumentToSpace(file); // Upload to DigitalOcean Spaces
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
