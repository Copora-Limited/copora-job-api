import { Request, Response } from 'express';
import { ContactDetailsService } from '../services/ContactDetailsService';

export class ContactDetailsController {
    // private static contactDetailsService = new ContactDetailsService();

    // Create or update ContactDetails based on applicationNo
    static async createContactDetails(req: Request, res: Response) {
        try {
          console.log("Data:", req.body);
          const { applicationNo, phone, address_line_1, town, country, postcode } = req.body;
    
          // Validation checks
          if (!phone) {
            return res.status(400).json({ message: 'Phone is required' });
          }
    
          // Define phone validation
          const phoneDigits = phone.replace(/\D/g, ''); // Remove non-numeric characters for validation
          const validUkPhoneWithCode = /^\+44\d{10}$/; // +44 followed by 10 digits
          const validUkPhoneWithoutCode = /^\d{10,11}$/; // 10 or 11 digits without country code

          // Validate phone format
          if (!(validUkPhoneWithCode.test(phone) || validUkPhoneWithoutCode.test(phoneDigits))) {
              return res.status(400).json({
                  message: 'Phone number should have 10 or 11 digits, or start with +44 followed by 10 digits.'
              });
          }

    
          if (!address_line_1) {
            return res.status(400).json({ message: 'Property name or number is required' });
          }
    
          if (!town) {
            return res.status(400).json({ message: 'Town is required' });
          }
    
          if (!/^[a-zA-Z\s]+$/.test(town)) {
            return res.status(400).json({ message: 'Town should contain letters only' });
          }
    
          if (!country) {
            return res.status(400).json({ message: 'Country is required' });
          }
    
          if (!postcode) {
            return res.status(400).json({ message: 'Postcode is required' });
          }
    
          // Check if ContactDetails with the given applicationNo exists
          const existingContactDetails = await ContactDetailsService.getContactDetailsByApplicationNo(applicationNo);
    
          if (existingContactDetails) {
            // Update existing record if found
            const updatedContactDetails = await ContactDetailsService.updateContactDetailsByApplicationNo(applicationNo, req.body);
            return res.status(200).json({ message: 'Contact Details updated', data: updatedContactDetails });
          } else {
            // Create a new record with 'attempted' set to true
            const newContactDetailsData = { ...req.body, attempted: true };
            const newContactDetails = await ContactDetailsService.createContactDetails(newContactDetailsData);
            return res.status(201).json({ message: 'Contact Details created', data: newContactDetails });
          }
        } catch (error) {
          console.error('Error creating or updating contact details:', error);
          res.status(500).json({ message: 'Error creating or updating contact details', error: error.message });
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
