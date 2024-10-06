import { Request, Response } from 'express';
import { BankDetailsService } from '../services/BankDetailsService';

export class BankDetailsController {

    // Create or update BankDetails based on applicationNo
    static async createBankDetails(req: Request, res: Response) {
        try {
            const { applicationNo } = req.body;

            // Check if the BankDetails with the given applicationNo exists
            const existingBankDetails = await BankDetailsService.getBankDetailsByApplicationNo(applicationNo);

            if (existingBankDetails) {
                // If it exists, update the existing record
                const updatedBankDetails = await BankDetailsService.updateBankDetailsByApplicationNo(applicationNo, req.body);
                return res.status(200).send({ message: 'Bank Details updated', data: updatedBankDetails });
            } else {
                // If it does not exist, create a new record
                const newBankDetails = await BankDetailsService.createBankDetails(req.body);
                return res.status(201).send({ message: 'Bank Details created', data: newBankDetails });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error creating or updating bank details', error: error.message });
        }
    }

    // Get Bank Details by applicationNo
    static async getBankDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const bankDetails = await BankDetailsService.getBankDetailsByApplicationNo(applicationNo);
            if (!bankDetails) {
                return res.status(404).send({ message: 'Bank Details not found' });
            }
            res.status(200).send(bankDetails);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching bank details', error: error.message });
        }
    }

    // Update Bank Details by applicationNo
    static async updateBankDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const updatedBankDetails = await BankDetailsService.updateBankDetailsByApplicationNo(applicationNo, req.body);
            if (!updatedBankDetails) {
                return res.status(404).send({ message: 'Bank Details not found' });
            }
            res.status(200).send(updatedBankDetails);
        } catch (error) {
            res.status(400).send({ message: 'Error updating bank details', error: error.message });
        }
    }

    // Delete Bank Details by applicationNo
    static async deleteBankDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const message = await BankDetailsService.deleteBankDetailsByApplicationNo(applicationNo);

            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
}
