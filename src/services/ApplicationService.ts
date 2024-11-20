import { AppDataSource } from '../data-source';
import { User } from '../entities/UserEntity';
// import { Application } from '../entities/ApplicationEntity';
import { PersonalDetails } from '../entities/PersonalDetailsEntity';
import { ContactDetails } from '../entities/ContactDetailsEntity';
import { ProfessionalDetails } from '../entities/ProfessionalDetailsEntity';
import { EducationalDetails } from '../entities/EducationalDetailsEntity';
import { HealthAndDisability } from '../entities/HealthAndDisabilityEntity';
import { FoodSafetyQuestionnaire } from '../entities/FoodSafetyQuestionnaireEntity';
import { BankDetails } from '../entities/BankDetailsEntity';
import { AgreementConsent } from '../entities/AgreementConsentEntity';
import { Reference } from '../entities/ReferenceEntity';
import { GeneralInfo } from '../entities/GeneralInfoEntity';
import { NextOfKin } from '../entities/NextOfKinEntity';
import { UserRole } from '../constants';
import { In } from 'typeorm';

export class ApplicationService {
  static async createApplication(data: any) {
    // Implementation for creating an application
  }

  static async updateApplicationByNo(applicationNo: string, data: any) {
    // Implementation for updating an application by its number
  }

 

  
  static async getApplicationByNo(applicationNo: string) {
    try {
      const application = await AppDataSource.getRepository(User).findOneBy({ applicationNo });
      if (!application) {
        throw new Error('Application not found');
      }
      return application;
    } catch (error) {
      throw new Error(`Error retrieving application: ${error.message}`);
    }
  }

  static async getApplicantData(applicationNo: string) {
    try {
      // Fetch user and other details
      const user = await AppDataSource.getRepository(User).findOneBy({ applicationNo });
      const personalDetails = await AppDataSource.getRepository(PersonalDetails).findOneBy({ applicationNo });
      const contactDetails = await AppDataSource.getRepository(ContactDetails).findOneBy({ applicationNo });
  
      // Fetch multiple professional details
      const professionalDetails = await AppDataSource.getRepository(ProfessionalDetails).find({
        where: { applicationNo }
      });
  
      const educationalDetails = await AppDataSource.getRepository(EducationalDetails).find({ where: {applicationNo} });
      const healthAndDisability = await AppDataSource.getRepository(HealthAndDisability).findOneBy({ applicationNo });
      const generalInfo = await AppDataSource.getRepository(GeneralInfo).findOneBy({ applicationNo });
      const nextOfKin = await AppDataSource.getRepository(NextOfKin).findOneBy({ applicationNo });
      const foodSafetyQuestionnaire = await AppDataSource.getRepository(FoodSafetyQuestionnaire).findOneBy({ applicationNo });
      const bankDetails = await AppDataSource.getRepository(BankDetails).findOneBy({ applicationNo });
      const agreementConsent = await AppDataSource.getRepository(AgreementConsent).findOneBy({ applicationNo });

      const reference = await AppDataSource.getRepository(Reference).find({
        where: { applicationNo }
      });

      return {
        user,
        personalDetails,
        contactDetails,
        generalInfo,
        nextOfKin,
        professionalDetails, // This will be an array
        educationalDetails,
        healthAndDisability,
        foodSafetyQuestionnaire,
        bankDetails,
        agreementConsent,
        reference,
      };
    } catch (error) {
      throw new Error(`Error retrieving applicant data: ${error.message}`);
    }
  }
  
  // Services
  static async getApplicantAttemptedData(applicationNo: string) {
    try {
        // Fetch `attempted` status from each table
        const user = await AppDataSource.getRepository(User).findOneBy({ applicationNo });
        const personalDetails = await AppDataSource.getRepository(PersonalDetails).findOneBy({ applicationNo });
        const contactDetails = await AppDataSource.getRepository(ContactDetails).findOneBy({ applicationNo });
        const professionalDetails = await AppDataSource.getRepository(ProfessionalDetails).find({ where: { applicationNo } });
        const educationalDetails = await AppDataSource.getRepository(EducationalDetails).find({ where: { applicationNo } });
        const healthAndDisability = await AppDataSource.getRepository(HealthAndDisability).findOneBy({ applicationNo });
        const generalInfo = await AppDataSource.getRepository(GeneralInfo).findOneBy({ applicationNo });
        const nextOfKin = await AppDataSource.getRepository(NextOfKin).findOneBy({ applicationNo });
        const foodSafetyQuestionnaire = await AppDataSource.getRepository(FoodSafetyQuestionnaire).findOneBy({ applicationNo });
        const bankDetails = await AppDataSource.getRepository(BankDetails).findOneBy({ applicationNo });
        const agreementConsent = await AppDataSource.getRepository(AgreementConsent).findOneBy({ applicationNo });
        const reference = await AppDataSource.getRepository(Reference).find({ where: { applicationNo } });

        // Consolidate all `attempted` values into a single array
        const result = [
            // { user: user?.attempted || false },
            { personalDetails: personalDetails?.attempted || false },
            { contactDetails: contactDetails?.attempted || false },
            { generalInfo: generalInfo?.attempted || false },
            { nextOfKin: nextOfKin?.attempted || false },
            // { professionalDetails: professionalDetails.length > 0 ? professionalDetails.some(detail => detail.attempted) : false },
            { reference: reference.length > 0 ? reference.some(ref => ref.attempted) : false },
            { educationalDetails: educationalDetails.length > 0 ? educationalDetails.some(detail => detail.attempted) : false },
            { healthAndDisability: healthAndDisability?.attempted || false },
            { foodSafetyQuestionnaire: foodSafetyQuestionnaire?.attempted || false },
            { bankDetails: bankDetails?.attempted || false },
            { agreementConsent: agreementConsent?.attempted || false },
            
        ];

        return result;
    } catch (error) {
        throw new Error(`Error retrieving applicant data: ${error.message}`);
    }
  }



   // Updated getAllApplicants method with relations
  static async getAllApplicantsData() {
    try {
      // Fetch all users (applicants)
      const users = await AppDataSource.getRepository(User).find();
  
      // Create an array to hold applicant data
      const allApplicants = await Promise.all(users.map(async (user) => {
        const applicationNo = user.applicationNo; // Assuming applicationNo is a property of User
  
        // Fetch details for each applicant
        const personalDetails = await AppDataSource.getRepository(PersonalDetails).findOneBy({ applicationNo });
        const contactDetails = await AppDataSource.getRepository(ContactDetails).findOneBy({ applicationNo });
        const professionalDetails = await AppDataSource.getRepository(ProfessionalDetails).find({ where: { applicationNo } });
        const educationalDetails = await AppDataSource.getRepository(EducationalDetails).find({ where: { applicationNo } });
        const healthAndDisability = await AppDataSource.getRepository(HealthAndDisability).findOneBy({ applicationNo });
        const generalInfo = await AppDataSource.getRepository(GeneralInfo).findOneBy({ applicationNo });
        const nextOfKin = await AppDataSource.getRepository(NextOfKin).findOneBy({ applicationNo });
        const foodSafetyQuestionnaire = await AppDataSource.getRepository(FoodSafetyQuestionnaire).findOneBy({ applicationNo });
        const bankDetails = await AppDataSource.getRepository(BankDetails).findOneBy({ applicationNo });
        const agreementConsent = await AppDataSource.getRepository(AgreementConsent).findOneBy({ applicationNo });
        const reference = await AppDataSource.getRepository(Reference).findOneBy({ applicationNo });
  
        return {
          user,
          personalDetails,
          contactDetails,
          generalInfo,
          nextOfKin,
          professionalDetails,
          educationalDetails,
          healthAndDisability,
          foodSafetyQuestionnaire,
          bankDetails,
          agreementConsent,
          reference,
        };
      }));
  
      return allApplicants;
    } catch (error) {
      throw new Error(`Error retrieving all applicants: ${error.message}`);
    }
  }
  
  

  static async getAllApplicants() {
    try {
      const applications = await AppDataSource.getRepository(User).find();
      return applications;
    } catch (error) {
      throw new Error(`Error retrieving all applicants: ${error.message}`);
    }
  }


  static async deleteApplicantData(applicationNo: string) {
    try {
        // Delete records from each table associated with the given application number
        await AppDataSource.getRepository(User).delete({ applicationNo });
        await AppDataSource.getRepository(PersonalDetails).delete({ applicationNo });
        await AppDataSource.getRepository(ContactDetails).delete({ applicationNo });
        await AppDataSource.getRepository(ProfessionalDetails).delete({ applicationNo });
        await AppDataSource.getRepository(EducationalDetails).delete({ applicationNo });
        await AppDataSource.getRepository(HealthAndDisability).delete({ applicationNo });
        await AppDataSource.getRepository(GeneralInfo).delete({ applicationNo });
        await AppDataSource.getRepository(NextOfKin).delete({ applicationNo });
        await AppDataSource.getRepository(FoodSafetyQuestionnaire).delete({ applicationNo });
        await AppDataSource.getRepository(BankDetails).delete({ applicationNo });
        await AppDataSource.getRepository(AgreementConsent).delete({ applicationNo });
        await AppDataSource.getRepository(Reference).delete({ applicationNo });
  
        // Return a confirmation message after successful deletion
        return { message: `All data for application number ${applicationNo} has been deleted successfully.` };
    } catch (error) {
        throw new Error(`Error deleting applicant data: ${error.message}`);
    }
  }

 // Service
static async deleteAllApplicantData() {
  try {
      // Fetch all users with the role of Applicant
      const applicantUsers = await AppDataSource.getRepository(User).find({
          where: { role: UserRole.Applicant },
          select: ['id'], // Select only the id field to optimize performance
      });

      // Extract applicant IDs
      const applicantIds = applicantUsers.map(user => user.id);

      // Check if any applicants exist before attempting to delete associated data
      if (applicantIds.length === 0) {
          return { message: "No applicants found with role 'applicant'." };
      }

      // List of repositories to clear data related to applicants
      const repositoriesToDeleteData = [
          PersonalDetails,
          ContactDetails,
          ProfessionalDetails,
          EducationalDetails,
          HealthAndDisability,
          GeneralInfo,
          NextOfKin,
          FoodSafetyQuestionnaire,
          BankDetails,
          AgreementConsent,
          Reference
      ];

      // Delete data from each repository where it is linked to applicant IDs
      for (const entity of repositoriesToDeleteData) {
          await AppDataSource.getRepository(entity).delete({ id: In(applicantIds) });
      }

      // Now delete applicants from the User table
      await AppDataSource.getRepository(User).delete({ role: UserRole.Applicant });

      // Return a confirmation message after successful deletion
      return { message: "All data related to applicants with role 'applicant' has been deleted successfully." };
  } catch (error) {
      // Throw a more descriptive error message
      throw new Error(`Error deleting applicant data: ${error.message}`);
  }
}


  
  
}
