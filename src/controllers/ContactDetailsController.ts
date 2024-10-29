import { Request, Response } from 'express';
import { ContactDetailsService } from '../services/ContactDetailsService';

export class ContactDetailsController {
    // private static contactDetailsService = new ContactDetailsService();

    private static validatePhone(phone: string): boolean {
      const phoneDigits = phone.replace(/\D/g, ''); // Remove non-numeric characters

      // UK number validation
      if (phone.startsWith('+44') || phone.startsWith('44')) {
          return phoneDigits.length === 12; // Expect exactly 12 digits for +44 or 44 format
      } 
      else if (/^\d{10,11}$/.test(phoneDigits)) { // Local UK number (without 44 prefix)
          return true; // 10 or 11 digits are valid for local UK numbers
      }

      // International format validation (not UK)
      return /^\+\d{10,15}$/.test(phone); // + followed by 10 to 15 digits
  }

  // Public method to create or update contact details
  public static async createContactDetails(req: Request, res: Response) {
      try {
          console.log("Data:", req.body);
          const { applicationNo, phone, address_line_1, town, country, postcode } = req.body;

          // Validation checks
          if (!phone) {
              return res.status(400).json({ message: 'Phone number is required' });
          }

          // Use the validatePhone method
          if (!ContactDetailsController.validatePhone(phone)) {
              return res.status(400).json({
                  message: 'Phone number should be a valid UK number (starting with +44 or 44 followed by 10 digits, or 10-11 digits locally) or a valid international format (+ followed by 10-15 digits).'
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
