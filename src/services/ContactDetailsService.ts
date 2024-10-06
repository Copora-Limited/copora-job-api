import { ContactDetails } from '../entities/ContactDetailsEntity';
import { AppDataSource } from '../data-source';

const contactDetailsRepository = AppDataSource.getRepository(ContactDetails);

export class ContactDetailsService {
    // Create new ContactDetails
    static async createContactDetails(data: Partial<ContactDetails>): Promise<ContactDetails> {
        const contactDetails = contactDetailsRepository.create(data);
        return await contactDetailsRepository.save(contactDetails);
    }

    // Get ContactDetails by applicationNo
    static async getContactDetailsByApplicationNo(applicationNo: string): Promise<ContactDetails | null> {
        return await contactDetailsRepository.findOneBy({ applicationNo });
    }

    // Update ContactDetails by applicationNo
    static async updateContactDetailsByApplicationNo(applicationNo: string, data: Partial<ContactDetails>): Promise<ContactDetails | null> {
        await contactDetailsRepository.update({ applicationNo }, data);
        return await contactDetailsRepository.findOneBy({ applicationNo });
    }

    // Delete ContactDetails by applicationNo
    static async deleteContactDetailsByApplicationNo(applicationNo: string): Promise<string> {
        const result = await contactDetailsRepository.delete({ applicationNo });
        if (result.affected === 0) {
            throw new Error('Contact Details not found');
        }
        return 'Contact Details deleted';
    }
}
