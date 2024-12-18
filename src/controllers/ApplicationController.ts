import { Request, Response } from 'express';
import { ApplicationService } from '../services/ApplicationService';
import { OnboardingStatus } from '../constants';
import pdfParse from 'pdf-parse';
import { Parser } from 'json2csv'; // Import json2csv for converting JSON to CSV
import PDFDocument from 'pdfkit'; // For PDF generation

export class ApplicationController {

  // constructor() {
  //   this.autoFillApplicationFormWithUploadedResume = this.autoFillApplicationFormWithUploadedResume.bind(this);

  // }

  static async getOnboardingStatus(req: Request, res: Response) {
    console.log('Onboarding status route hit');
    const statuses = Object.values(OnboardingStatus);
    res.status(200).json({ success: true, data: statuses });
  }

  
  static async createApplication(req: Request, res: Response) {
    try {
      const result = await ApplicationService.createApplication(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getApplicationByNo(req: Request, res: Response) {
    try {
      const result = await ApplicationService.getApplicationByNo(req.params.applicationNo);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateApplicationByNo(req: Request, res: Response) {
    try {
      const result = await ApplicationService.updateApplicationByNo(req.params.applicationNo, req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }



  static async getApplicantData(req: Request, res: Response) {
    try {
      const result = await ApplicationService.getApplicantData(req.params.applicationNo);
      if (!result.user) {
        return res.status(404).json({ message: 'Applicant not found' });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Controller
  static async getApplicantAttemptedData(req: Request, res: Response) {
    try {
        const result = await ApplicationService.getApplicantAttemptedData(req.params.applicationNo);
        
        // Check if the user attempted status is available
        // const userAttemptedStatus = result.find(item => item.hasOwnProperty('user'));
        // if (!userAttemptedStatus || !userAttemptedStatus.user) {
        //     return res.status(404).json({ message: 'Applicant not found' });
        // }
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }


  static async getAllApplicants(req: Request, res: Response) {
    try {
      const result = await ApplicationService.getAllApplicants();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Method to handle auto-filling the application form using an uploaded resume
  static async autoFillApplicationFormWithUploadedResume(req: Request, res: Response): Promise<Response> {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    console.log("Received request to auto-fill form with resume.");
    console.log("Resume file received:", req.file.originalname);

    const resumeBuffer = req.file.buffer;
    console.log("Extracting text from resume buffer...");

    // Validate buffer
    if (!Buffer.isBuffer(resumeBuffer)) {
      throw new Error("Uploaded file is not a valid buffer");
    }

    // Extract text from resume PDF
    const resumeText = await pdfParse(resumeBuffer);
    console.log("Text extracted from resume:", resumeText.text);

    // Extract data from the resume text
    const extractedData = await ApplicationController.extractDataFromResume(resumeText.text);

    return res.status(200).json({
      message: 'Resume processed successfully',
      extractedData, 
    });

  } catch (error) {
    console.error('Error processing resume:', error);
    return res.status(500).json({ message: 'Error processing resume', error: error.message });
  }
  }

  static async extractDataFromResume(resumeText: string) {
    console.log('Extracting data from resume text...');

    const extractedData: any = {};

    // Step 1: Normalize the text (remove unnecessary whitespaces, standardize new lines)
    resumeText = resumeText.replace(/\r?\n|\r/g, "\n").trim();

    // Step 2: Extract Name (Account for name-like patterns or contextual cues)
    // Example: Look for "Name" or assume first proper noun is the name
    const nameRegex = /(?:Name[:\s]*)?([A-Z][a-z]+(?: [A-Z][a-z]+)+)/;
    const nameMatch = resumeText.match(nameRegex);
    if (nameMatch) {
      extractedData.name = nameMatch[1].trim();
      console.log('Extracted name:', extractedData.name);
    } else {
      console.log('Name not found in resume text.');
    }

    // Step 3: Extract Email (More precise regex for email)
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
    const emailMatch = resumeText.match(emailRegex);
    if (emailMatch) {
      extractedData.email = emailMatch[0].trim();
      console.log('Extracted email:', extractedData.email);
    } else {
      console.log('Email not found in resume text.');
    }

    // Step 4: Extract Phone Number (Handle different phone formats)
    const phoneRegex = /(\+?\d{1,3}[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/;
    const phoneMatch = resumeText.match(phoneRegex);
    if (phoneMatch) {
      extractedData.phone = phoneMatch[0].trim();
      console.log('Extracted phone number:', extractedData.phone);
    } else {
      console.log('Phone number not found in resume text.');
    }

    // Step 5: Extract Work Experience (Section-based extraction with keyword search)
    const workExperienceRegex = /(?:Work Experience|Experience|Professional Experience)[\s\S]+?(?=Projects|Education|Skills)/i;
    const workExperienceMatch = resumeText.match(workExperienceRegex);
    if (workExperienceMatch) {
      extractedData.workExperience = workExperienceMatch[0].trim();
      console.log('Extracted work experience:', extractedData.workExperience);
    } else {
      console.log('Work experience not found in resume text.');
    }

    // Step 6: Extract Projects (Similar logic as Work Experience)
    const projectsRegex = /(?:Projects|Project Experience|Key Projects)[\s\S]+?(?=Education|Skills|Certifications)/i;
    const projectsMatch = resumeText.match(projectsRegex);
    if (projectsMatch) {
      extractedData.projects = projectsMatch[0].trim();
      console.log('Extracted projects:', extractedData.projects);
    } else {
      console.log('Projects not found in resume text.');
    }

    // Step 7: Extract Education (Similar logic for education section)
    const educationRegex = /(?:Education|Academic Background|Degrees)[\s\S]+?(?=Skills|Certifications|Projects)/i;
    const educationMatch = resumeText.match(educationRegex);
    if (educationMatch) {
      extractedData.education = educationMatch[0].trim();
      console.log('Extracted education:', extractedData.education);
    } else {
      console.log('Education not found in resume text.');
    }

    // Step 8: Extract Skills
    const skillsRegex = /(?:Skills|Technical Skills|Core Competencies)[\s\S]+?(?=Education|Experience|Projects|Certifications)/i;
    const skillsMatch = resumeText.match(skillsRegex);
    if (skillsMatch) {
      extractedData.skills = skillsMatch[0].trim();
      console.log('Extracted skills:', extractedData.skills);
    } else {
      console.log('Skills not found in resume text.');
    }

    return extractedData;
  }

  // New method for downloading applicant data as CSV
  static async downloadApplicantDataCsv(req: Request, res: Response) {
    try {
      const { applicationNo } = req.params;
      const applicantData = await ApplicationService.getApplicantData(applicationNo);
      
      if (!applicantData) {
        return res.status(404).json({ message: 'Applicant not found' });
      }

      // Map applicant data into the CSV structure
      const csvData = {
        Title: applicantData.personalDetails?.title,
        Forename1: applicantData.user?.firstName,
        Forename2: applicantData.user?.middleName,
        Surname: applicantData.user?.lastName,
        PreferredName: applicantData.user?.firstName,
        Telephone: applicantData.contactDetails?.phone,
        Mobile: applicantData.contactDetails?.phone, // Assuming phone is used for both
        Email: applicantData.user?.email,
        Address: `${applicantData.contactDetails?.address_line_1}, ${applicantData.contactDetails?.town}, ${applicantData.contactDetails?.postcode}`,
        Country: applicantData.contactDetails?.country,
        Gender: applicantData.personalDetails?.gender,
        Birthday: applicantData.personalDetails?.dateOfBirth,
        ProfilePicture: applicantData.personalDetails?.passportPhoto, // Assuming passport photo contains passport info
        NINumber: applicantData.personalDetails?.nationalInsuranceNumber,
        WorksNumber: '', // This field is not mapped in your data
        Department: '', // This field is not mapped in your data
        JobTitle: applicantData.professionalDetails?.[0]?.jobTitle,
        College: applicantData.educationalDetails?.[0]?.schoolName,
        DateStarted: applicantData.professionalDetails?.[0]?.startDate,
        DateLeft: applicantData.professionalDetails?.[0]?.endDate,
        Director: applicantData.personalDetails?.ninProof, // This field is not mapped in your data
        DirectorStartDate: applicantData.personalDetails?.visaDocument, // This field is not mapped in your data
        DirectorEndDate: applicantData.personalDetails?.internationalPassport, // This field is not mapped in your data
        AlternativeDirectorsNIC: '', // This field is not mapped in your data
        PrimaryNICOnly: '', // This field is not mapped in your data
        PayFrequency: '', // This field is not mapped in your data
        PayMethod: '', // This field is not mapped in your data
        DeliveryMethod: '', // This field is not mapped in your data
        BankName: applicantData.bankDetails?.bankName,
        BranchName: '', // This field is not mapped in your data
        SortCode: applicantData.bankDetails?.sortCode,
        AccountName: applicantData.bankDetails?.accountName,
        AccountNumber: applicantData.bankDetails?.accountNumber,
        PaymentReference: '', // This field is not mapped in your data
        BuildingSocietyReference: '', // This field is not mapped in your data
        BankTelephone: '', // This field is not mapped in your data
        BankAddress: '', // This field is not mapped in your data
        AEExcluded: '', // This field is not mapped in your data
        PostponedUntil: '', // This field is not mapped in your data
        AEPension: '', // This field is not mapped in your data
        AEJoined: '', // This field is not mapped in your data
        AEOptedIn: '', // This field is not mapped in your data
        AELeft: '', // This field is not mapped in your data
        AEOptedOut: '', // This field is not mapped in your data
        Group: '', // This field is not mapped in your data
        EmployeePercentage: '', // This field is not mapped in your data
        EmployerPercentage: '', // This field is not mapped in your data
        AVCPercentage: '' // This field is not mapped in your data
      };

      // Convert the data to CSV
      const fields = Object.keys(csvData);
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse([csvData]); // Wrap csvData in an array to avoid issue with a single row

      // Set headers for file download
      res.header('Content-Type', 'text/csv');
      res.attachment(`applicant_${applicationNo}.csv`);
      return res.send(csv);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Helper function to format phone numbers


  // New method for downloading all applicants' data as CSV
  static async downloadAllApplicantsCsv(req: Request, res: Response) {
    try {
      // Fetch all applicants from the service
      const allApplicants = await ApplicationService.getAllApplicantsData(); // Update to the correct method name
  
      if (!allApplicants || allApplicants.length === 0) {
        return res.status(404).json({ message: 'No applicants found' });
      }

      const formatPhoneNumber = (phone: string | undefined | null): string => {
        if (!phone) return 'N/A'; // Return 'N/A' if the phone number is null or undefined
        
        // Clean the phone number by removing any non-digit characters
        const cleanedPhone = phone.replace(/\D/g, '');
      
        // Return the formatted phone number with a '+' in front
        return `+${cleanedPhone}`;
      };
  
      // Map all applicants' data into the CSV structure
      const csvData = allApplicants.map(applicant => {
        const { personalDetails, user, contactDetails, professionalDetails, educationalDetails, bankDetails } = applicant;
  
        return {
          // Title: personalDetails?.gender == "Female" ? 'Miss' : 'Mr',
          Title: personalDetails?.gender === "Female" ? "Miss" : personalDetails?.gender === "Male" ? "Mr" : "Others",
          Forename1: user?.firstName ?? 'N/A',
          Forename2: user?.middleName ?? 'N/A',
          Surname: user?.lastName ?? 'N/A',
          PreferredName: user?.firstName ?? 'N/A',
          Telephone: formatPhoneNumber(contactDetails?.phone) ?? 'N/A',
          Mobile: formatPhoneNumber(contactDetails?.phone) ?? 'N/A', // Assuming phone is used for both
          Email: user?.email ?? 'N/A',
          Address: `${contactDetails?.address_line_1 ?? 'N/A'}, ${contactDetails?.town ?? 'N/A'}, ${contactDetails?.postcode ?? 'N/A'}`,
          Country: contactDetails?.country ?? 'N/A',
          Gender: personalDetails?.gender ?? 'N/A',
          Birthday: personalDetails?.dateOfBirth ?? 'N/A',
          PassportNumber: personalDetails?.internationalPassport ?? 'N/A',
          NINumber: personalDetails?.nationalInsuranceNumber ?? 'N/A',
          WorksNumber: 'N/A', // Not mapped
          Department: 'N/A', // Not mapped
          JobTitle: professionalDetails?.[0]?.jobTitle ?? 'N/A',
          College: educationalDetails?.[0]?.schoolName ?? 'N/A',
          DateStarted: professionalDetails?.[0]?.startDate ?? 'N/A',
          DateLeft: professionalDetails?.[0]?.endDate ?? 'N/A',
          Director: personalDetails?.passportPhoto ?? 'N/A', // Not mapped
          DirectorStartDate: personalDetails?.ninProof ?? 'N/A', 
          DirectorEndDate: 'N/A', // This field is not mapped in your data
          AlternativeDirectorsNIC: personalDetails?.visaDocument ?? 'N/A', // Not mapped
          PrimaryNICOnly: 'N/A', // Not mapped
          PayFrequency: 'N/A', // Not mapped
          PayMethod: 'N/A', // Not mapped
          DeliveryMethod: 'N/A', // Not mapped
          BankName: bankDetails?.bankName ?? 'N/A',
          BranchName: 'N/A', // Not mapped
          SortCode: bankDetails?.sortCode ?? 'N/A',
          AccountName: bankDetails?.accountName ?? 'N/A',
          AccountNumber: bankDetails?.accountNumber ?? 'N/A',
          PaymentReference: 'N/A', // Not mapped
          BuildingSocietyReference: 'N/A', // Not mapped
          BankTelephone: 'N/A', // Not mapped
          BankAddress: 'N/A', // Not mapped
          AEExcluded: 'N/A', // Not mapped
          PostponedUntil: 'N/A', // Not mapped
          AEPension: 'N/A', // Not mapped
          AEJoined: 'N/A', // Not mapped
          AEOptedIn: 'N/A', // Not mapped
          AELeft: 'N/A', // Not mapped
          AEOptedOut: 'N/A', // Not mapped
          Group: 'N/A', // Not mapped
          EmployeePercentage: 'N/A', // Not mapped
          EmployerPercentage: 'N/A', // Not mapped
          AVCPercentage: 'N/A' // Not mapped
        };
      });
  
      // Convert the data to CSV
      const fields = Object.keys(csvData[0]);
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(csvData); // Parse all applicants' data into CSV
  
      // Set headers for file download
      res.header('Content-Type', 'text/csv');
      res.attachment('all_applicants.csv');
      return res.send(csv);
  
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  

  // New method for downloading applicant data as PDF
  static async downloadApplicantDataPdf(req: Request, res: Response) {
    try {
      const { applicationNo } = req.params;
      const applicantData = await ApplicationService.getApplicantData(applicationNo);

      if (!applicantData) {
        return res.status(404).json({ message: 'Applicant not found' });
      }

      // Initialize PDF document
      const doc = new PDFDocument();
      
      // Set response headers for PDF download
      res.setHeader('Content-disposition', `attachment; filename="applicant_${applicationNo}.pdf"`);
      res.setHeader('Content-type', 'application/pdf');

      // Pipe the PDF into the response
      doc.pipe(res);

      // Add content to the PDF
      doc.fontSize(18).text(`Applicant Data - ${applicationNo}`, { align: 'center' });
      doc.moveDown();

      // Add applicant data to PDF
      doc.fontSize(12).text(`Title: ${applicantData.personalDetails?.title || 'N/A'}`);
      doc.text(`Forename1: ${applicantData.user?.firstName || 'N/A'}`);
      doc.text(`Forename2: ${applicantData.user?.middleName || 'N/A'}`);
      doc.text(`Surname: ${applicantData.user?.lastName || 'N/A'}`);
      doc.text(`PreferredName: ${applicantData.user?.firstName || 'N/A'}`);
      doc.text(`Telephone: ${applicantData.contactDetails?.phone || 'N/A'}`);
      doc.text(`Mobile: ${applicantData.contactDetails?.phone || 'N/A'}`);
      doc.text(`Email: ${applicantData.user?.email || 'N/A'}`);
      doc.text(`Address: ${applicantData.contactDetails?.address_line_1 || 'N/A'}, ${applicantData.contactDetails?.town || 'N/A'}, ${applicantData.contactDetails?.postcode || 'N/A'}`);
      doc.text(`Country: ${applicantData.contactDetails?.country || 'N/A'}`);
      doc.text(`Gender: ${applicantData.personalDetails?.gender || 'N/A'}`);
      doc.text(`Birthday: ${applicantData.personalDetails?.dateOfBirth || 'N/A'}`);
      doc.text(`PassportNumber: ${applicantData.personalDetails?.passportPhoto || 'N/A'}`);
      doc.text(`NINumber: ${applicantData.personalDetails?.nationalInsuranceNumber || 'N/A'}`);
      doc.text(`JobTitle: ${applicantData.professionalDetails?.[0]?.jobTitle || 'N/A'}`);
      doc.text(`College: ${applicantData.educationalDetails?.[0]?.schoolName || 'N/A'}`);
      doc.text(`DateStarted: ${applicantData.professionalDetails?.[0]?.startDate || 'N/A'}`);
      doc.text(`DateLeft: ${applicantData.professionalDetails?.[0]?.endDate || 'N/A'}`);
      doc.text(`BankName: ${applicantData.bankDetails?.bankName || 'N/A'}`);
      doc.text(`SortCode: ${applicantData.bankDetails?.sortCode || 'N/A'}`);
      doc.text(`AccountName: ${applicantData.bankDetails?.accountName || 'N/A'}`);
      doc.text(`AccountNumber: ${applicantData.bankDetails?.accountNumber || 'N/A'}`);

      // Finalize the PDF and end the stream
      doc.end();

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Delete applicant record from all table
  static async deleteApplicant(req: Request, res: Response) {
    try {
      const { applicationNo } = req.params; // Extract application number from the request parameters
      const result = await ApplicationService.deleteApplicantData(applicationNo);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

   // Delete applicant data from all tables for users with the 'applicant' role
  static async deleteApplicants(req: Request, res: Response) {
    try {
        const result = await ApplicationService.deleteAllApplicantData();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }


  
  

}



