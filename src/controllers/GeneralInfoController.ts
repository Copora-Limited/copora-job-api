import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { GeneralInfo } from '../entities/GeneralInfoEntity';
import { GeneralInfoService } from '../services/GeneralInfoService';
import { UserService } from '../services/UserService';
import path from 'path';
import fs from 'fs';
import uploadDocumentsAndImages from '../multerConfig'; // Import multer config

export class GeneralInfoController {
    private generalInfoRepository = AppDataSource.getRepository(GeneralInfo);

    async create(req: Request, res: Response) {
        // Use Multer middleware to handle file uploads
        uploadDocumentsAndImages.fields([
            { name: 'level2FoodHygieneCertificateUpload', maxCount: 1 },
            { name: 'personalLicenseCertificateUpload', maxCount: 1 },
            { name: 'dbsCertificateUpload', maxCount: 1 }
        ])(req, res, async (err: any) => {
            if (err) {
                return res.status(400).json({ statusCode: 400, message: 'File upload error', error: err.message });
            }

            const { applicationNo } = req.body;

            // Check if applicant exists
            const existingApplicant = await UserService.findApplicationNo(applicationNo);
            if (!existingApplicant) {
                return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
            }

            // Check if general info for the application already exists
            const existingEntry = await GeneralInfoService.getByApplicationNo(applicationNo);

            // Prepare file paths if files are uploaded
            const level2FoodHygieneCertificateUpload = req.files?.['level2FoodHygieneCertificateUpload']?.[0]?.path || null;
            const personalLicenseCertificateUpload = req.files?.['personalLicenseCertificateUpload']?.[0]?.path || null;
            const dbsCertificateUpload = req.files?.['dbsCertificateUpload']?.[0]?.path || null;

            const generalInfoData = {
                ...req.body,
                level2FoodHygieneCertificateUpload,
                personalLicenseCertificateUpload,
                dbsCertificateUpload
            };

            // Update existing entry or create a new one
            if (existingEntry) {
                const updatedEntry = await GeneralInfoService.updateByApplicationNo(applicationNo, generalInfoData);
                return res.status(200).json({ message: 'General Info updated', data: updatedEntry });
            } else {
                const newEntry = this.generalInfoRepository.create(generalInfoData);
                const savedEntry = await this.generalInfoRepository.save(newEntry);
                return res.status(201).json({ message: 'General Info created', data: savedEntry });
            }
        });
    }


    async getAll(req: Request, res: Response) {
        const generalInfo = await this.generalInfoRepository.find();
        res.status(200).send(generalInfo);
    }

    async getById(req: Request, res: Response) {
        const generalInfo = await this.generalInfoRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!generalInfo) {
            return res.status(404).send('General Info not found');
        }
        res.status(200).send(generalInfo);
    }

    async update(req: Request, res: Response) {
        const generalInfo = await this.generalInfoRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!generalInfo) {
            return res.status(404).send('General Info not found');
        }
        Object.assign(generalInfo, req.body);
        await this.generalInfoRepository.save(generalInfo);
        res.status(200).send(generalInfo);
    }

    async delete(req: Request, res: Response) {
        const result = await this.generalInfoRepository.delete({ id: parseInt(req.params.id) });
        if (result.affected === 0) {
            return res.status(404).send('General Info not found');
        }
        res.status(200).send('General Info deleted');
    }

    
}
