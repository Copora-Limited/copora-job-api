// src/controllers/PersonalDetailsController.ts
import { Request, Response } from 'express';
import { PersonalDetailsService } from '../services/PersonalDetailsService';
import { UserService } from '../services/UserService';
import { v2 as cloudinary } from 'cloudinary';
import { differenceInYears } from 'date-fns'; // Use date-fns or similar library to calculate age
import { handleFileUpload } from '../utils/uploadToSpace'; // Adjust the import path as necessary


// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
export class PersonalDetailsController {
  // Helper function to upload a file to Cloudinary
  static async uploadPassportPhoto(file: Express.Multer.File | undefined): Promise<string> {
    if (!file) return '';

    try {
      const result = await cloudinary.uploader.upload(file.path);
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading passport photo:', error);
      throw new Error('Failed to upload passport photo');
    }
  }

  // Create or update PersonalDetails
  static async createOrUpdatePersonalDetails(req: Request, res: Response): Promise<void> {
    try {
      const { applicationNo, dateOfBirth, gender, nationalInsuranceNumber } = req.body;
      const file = req.file;

      // Check required fields
      if (!dateOfBirth) {
        res.status(400).json({ statusCode: 400, message: 'Date of birth is required' });
        return;
      }

      // Age validation: Check if the applicant is at least 16 years old
      const age = differenceInYears(new Date(), new Date(dateOfBirth));
      if (age < 16) {
        res.status(400).json({ statusCode: 400, message: 'Under Age: Date of birth invalid. You must be at least 16 years old to proceed.' });
        return;
      }

      if (age >= 50) {
        res.status(400).json({ statusCode: 400, message: 'Date of birth invalid. Age must be below 50 to proceed.' });
        return;
      }

      if (!gender) {
        res.status(400).json({ statusCode: 400, message: 'Gender is required' });
        return;
      }

      if (!nationalInsuranceNumber) {
        res.status(400).json({ statusCode: 400, message: 'National Insurance Number is required' });
        return;
      }

      const existingApplicant = await UserService.findApplicationNo(applicationNo);

      if (!existingApplicant) {
        res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
        return;
      }

      // Check if the PersonalDetails with the given applicationNo exists
      const existingEntry = await PersonalDetailsService.getByApplicationNo(applicationNo);

      // Preserve existing passport photo if no new file is uploaded
      let passportPhoto = existingEntry?.passportPhoto || '';

      if (file) {
        passportPhoto = await handleFileUpload(file);
      }

      // Merge the new data with the existing data, updating only fields that are provided
      const dataToSave = {
        ...existingEntry,
        ...req.body,
        passportPhoto: passportPhoto || existingEntry?.passportPhoto,
        attempted: true, // Set attempted to true
      };

      if (existingEntry) {
        // Update the existing record
        const updatedEntry = await PersonalDetailsService.updateByApplicationNo(applicationNo, dataToSave);
        res.status(200).json({ message: 'Personal details updated', data: updatedEntry });
      } else {
        // Create a new record
        const newEntry = await PersonalDetailsService.create(dataToSave);
        res.status(201).json({ message: 'Personal details created', data: newEntry });
      }
    } catch (error) {
      console.error('Error creating or updating personal details:', error);
      res.status(500).json({ message: 'Error creating or updating personal details', error: error.message });
    }
  }


    // Get PersonalDetails by applicationNo
    static async getPersonalDetailsByNo(req: Request, res: Response) {
        // console.log("req:", req.params)
        try {
            const { applicationNo } = req.params;
            const entry = await PersonalDetailsService.getByApplicationNo(applicationNo);
            console.log("entry:", entry)

            if (!entry) {
              return res.status(200).send([]);
          }
            res.status(200).send(entry);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching personal details', error: error.message });
        }
    }

    // Update PersonalDetails by applicationNo
    static async updatePersonalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const updatedEntry = await PersonalDetailsService.updateByApplicationNo(applicationNo, req.body);
            if (!updatedEntry) {
                return res.status(404).send({ message: 'Personal details not found' });
            }
            res.status(200).send(updatedEntry);
        } catch (error) {
            res.status(400).send({ message: 'Error updating personal details', error: error.message });
        }
    }

    // Delete PersonalDetails by applicationNo
    static async deletePersonalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const message = await PersonalDetailsService.deleteByApplicationNo(applicationNo);
            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
}
