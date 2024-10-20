import { Request, Response } from 'express';
import { ContactDetailsService } from '../services/ContactDetailsService';

export class ContactDetailsController {
    // private static contactDetailsService = new ContactDetailsService();

    // Create or update ContactDetails based on applicationNo
    static async createContactDetails(req: Request, res: Response) {
        try {
            console.log("Data:", req.body);
            const { applicationNo } = req.body;

            // Check if the ContactDetails with the given applicationNo exists
            const existingContactDetails = await ContactDetailsService.getContactDetailsByApplicationNo(applicationNo);

            if (existingContactDetails) {
                // If it exists, update the existing record
                const updatedContactDetails = await ContactDetailsService.updateContactDetailsByApplicationNo(applicationNo, req.body);
                return res.status(200).send({ message: 'Contact Details updated', data: updatedContactDetails });
            } else {
                // If it does not exist, create a new record
                const newContactDetails = await ContactDetailsService.createContactDetails(req.body);
                return res.status(201).send({ message: 'Contact Details created', data: newContactDetails });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error creating or updating contact details', error: error.message });
        }
    }

    // Get Contact Details by applicationNo
    static async getContactDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const contactDetails = await ContactDetailsService.getContactDetailsByApplicationNo(applicationNo);
            if (!contactDetails) {
                return res.status(404).send({ message: 'Contact Details not found' });
            }
            res.status(200).send(contactDetails);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching contact details', error: error.message });
        }
    }

    // Update Contact Details by applicationNo
    static async updateContactDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const updatedContactDetails = await ContactDetailsService.updateContactDetailsByApplicationNo(applicationNo, req.body);
            if (!updatedContactDetails) {
                return res.status(404).send({ message: 'Contact Details not found' });
            }
            res.status(200).send(updatedContactDetails);
        } catch (error) {
            res.status(400).send({ message: 'Error updating contact details', error: error.message });
        }
    }

    // Delete Contact Details by applicationNo
    static async deleteContactDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const message = await ContactDetailsService.deleteContactDetailsByApplicationNo(applicationNo);
            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
}
