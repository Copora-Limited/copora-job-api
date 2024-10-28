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
    // static async createOrUpdateGeneralInfo(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { applicationNo, ...otherFields } = req.body;
    
    //         if (!applicationNo) {
    //             res.status(400).json({ statusCode: 400, message: 'Application number is required' });
    //             return;
    //         }
    
    //         // Check if applicant exists
    //         const existingApplicant = await UserService.findApplicationNo(applicationNo);
    //         if (!existingApplicant) {
    //             res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
    //             return;
    //         }
    
    //         // Check if general info for the application already exists
    //         const existingEntry = await GeneralInfoService.getByApplicationNo(applicationNo);
    
    //         // Files from the request (Assuming files are being uploaded correctly in middleware)
    //         const { level2FoodHygieneCertificateUpload, personalLicenseCertificateUpload, dbsCertificateUpload } = req.files as {
    //             [fieldname: string]: Express.Multer.File[];
    //         };
    
    //         // Upload files if they are provided and get their URLs
    //         const level2FoodHygieneCertificateUrl = level2FoodHygieneCertificateUpload?.[0]
    //             ? await GeneralInfoController.uploadFile(level2FoodHygieneCertificateUpload[0])
    //             : existingEntry?.level2FoodHygieneCertificateUpload;
    
    //         const personalLicenseCertificateUrl = personalLicenseCertificateUpload?.[0]
    //             ? await GeneralInfoController.uploadFile(personalLicenseCertificateUpload[0])
    //             : existingEntry?.personalLicenseCertificateUpload;
    
    //         const dbsCertificateUrl = dbsCertificateUpload?.[0]
    //             ? await GeneralInfoController.uploadFile(dbsCertificateUpload[0])
    //             : existingEntry?.dbsCertificateUpload;
    
    //         // Merge the new data with the existing data, only updating fields that are provided
    //         const dataToSave = {
    //             ...existingEntry, // Retain existing fields
    //             applicationNo,
    //             ...otherFields, // Override fields with the new values from req.body
    //             level2FoodHygieneCertificateUpload: level2FoodHygieneCertificateUrl,
    //             personalLicenseCertificateUpload: personalLicenseCertificateUrl,
    //             dbsCertificateUpload: dbsCertificateUrl,
    //             attempted: true, // Set attempted to true
    //         };
    
    //         console.log("dataToSave:", dataToSave);
    
    //         // Save or update the record based on whether it exists
    //         if (existingEntry) {
    //             // Update the existing record
    //             const updatedEntry = await GeneralInfoService.updateByApplicationNo(applicationNo, dataToSave);
    //             res.status(200).json({ message: 'General Info details updated', data: updatedEntry });
    //         } else {
    //             // Create a new record
    //             const newEntry = await GeneralInfoService.create(dataToSave);
    //             res.status(201).json({ message: 'General Info details created', data: newEntry });
    //         }
    //     } catch (error) {
    //         console.error('Error creating or updating general info:', error);
    //         res.status(500).json({ message: 'Error creating or updating general info', error: error.message });
    //     }
    // }

    static async createOrUpdateGeneralInfo(req: Request, res: Response) {
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
    
          // Validation for each required field to ensure they are boolean values
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
    
          // Upload files if they are provided and get their URLs
          const level2FoodHygieneCertificateUrl = level2FoodHygieneCertificateUpload?.[0]
            ? await GeneralInfoController.uploadFile(level2FoodHygieneCertificateUpload[0])
            : existingEntry?.level2FoodHygieneCertificateUpload;
    
          const personalLicenseCertificateUrl = personalLicenseCertificateUpload?.[0]
            ? await GeneralInfoController.uploadFile(personalLicenseCertificateUpload[0])
            : existingEntry?.personalLicenseCertificateUpload;
    
          const dbsCertificateUrl = dbsCertificateUpload?.[0]
            ? await GeneralInfoController.uploadFile(dbsCertificateUpload[0])
            : existingEntry?.dbsCertificateUpload;
    
          // Merge the new data with the existing data, updating only fields that are provided
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
    
          console.log("dataToSave:", dataToSave);
    
          // Save or update the record based on whether it exists
          if (existingEntry) {
            // Update the existing record
            const updatedEntry = await GeneralInfoService.updateByApplicationNo(applicationNo, dataToSave);
            res.status(200).json({ message: 'General Info details updated', data: updatedEntry });
          } else {
            // Create a new record
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
