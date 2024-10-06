import { AgreementConsent } from '../entities/AgreementConsentEntity';
import { AppDataSource } from '../data-source';

const agreementConsentRepository = AppDataSource.getRepository(AgreementConsent);

export class AgreementConsentService {
  // Create a new AgreementConsent
  static async create(data: any) {
    const agreementConsent = agreementConsentRepository.create(data);
    return await agreementConsentRepository.save(agreementConsent);
  }

  // Get all AgreementConsents
  static async getAll() {
    return await agreementConsentRepository.find();
  }

  // Get AgreementConsent by applicationNo
  static async getByApplicationNo(applicationNo: string) {
    return await agreementConsentRepository.findOneBy({ applicationNo });
  }

  // Update AgreementConsent by applicationNo
  static async updateByApplicationNo(applicationNo: string, data: any) {
    const agreementConsent = await this.getByApplicationNo(applicationNo);
    if (!agreementConsent) {
      throw new Error('Agreement Consent not found');
    }
    Object.assign(agreementConsent, data);
    return await agreementConsentRepository.save(agreementConsent);
  }

  // Delete AgreementConsent by applicationNo
  static async deleteByApplicationNo(applicationNo: string) {
    const result = await agreementConsentRepository.delete({ applicationNo });
    if (result.affected === 0) {
      throw new Error('Agreement Consent not found');
    }
    return 'Agreement Consent deleted';
  }
}
