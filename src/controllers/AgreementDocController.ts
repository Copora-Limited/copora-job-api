import { Request, Response } from 'express';
import { generatePDF } from '../utils/pdfGenerator';
import { sendAgreementEmail } from '../lib/emailActions';
import { UserService } from '../services/UserService';
import { ContactDetailsService } from '../services/ContactDetailsService';
import path from 'path';

// Function to get the current date in the desired format
const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October',
        'November', 'December'
    ];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();

    return {
        day: day.toString(),   // Convert day to string
        month: month,          // Month as a string
        year: year             // Year as a number
    };
};

export const createAgreement = async (req: Request, res: Response) => {
    try {
        const { applicationNo, jobTitle, jobDescription, startDate, amount } = req.body;

        // Find the applicant by application number
        const existingApplicant = await UserService.findApplicationNo(applicationNo);
        const applicantContact = await ContactDetailsService.getContactDetailsByApplicationNo(applicationNo);
    
        if (!existingApplicant) {
            return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
        }

        const { firstName, lastName, middleName, email } = existingApplicant;
        const { street, country, postcode } = applicantContact;

        // Get today's date
        const { day, month, year } = getCurrentDate();
  
        // Generate agreement data
        const agreementData = {
            firstName,
            lastName,
            middleName,
            email,
            address: `${street}, ${country}, ${postcode}`,
            jobTitle,
            jobDescription,
            startDate,  // Employment start date (today's date)
            amount,
            day,
            month,
            year
        };
        
        // Generate PDF file path
        const pdfPath = path.join(__dirname, '../../agreements', `${firstName}_${lastName}_agreement.pdf`);

        // Generate PDF using pdfkit
        await generatePDF(agreementData, pdfPath);
  
        // Send the generated PDF via email
        await sendAgreementEmail({ firstName, email }, pdfPath);
  
        res.status(200).json({ message: 'Agreement generated and sent successfully.' });
    } catch (error) {
        console.error('Error generating agreement:', error);
        res.status(500).json({ error: 'Failed to generate agreement' });
    }
};
