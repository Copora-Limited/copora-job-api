import { BankDetails } from '../entities/BankDetailsEntity';
import { AppDataSource } from '../data-source';

const bankDetailsRepository = AppDataSource.getRepository(BankDetails);
  
export class BankDetailsService {
    // Create a new BankDetails
    static async createBankDetails(data: any) {
        const bankDetails = bankDetailsRepository.create(data);
        return await bankDetailsRepository.save(bankDetails);
    }

    // Get BankDetails by applicationNo
    static async getBankDetailsByApplicationNo(applicationNo: string){
        return await bankDetailsRepository.findOneBy({ applicationNo });
    }

    // Update BankDetails by applicationNo
    static async updateBankDetailsByApplicationNo(applicationNo: string, data: Partial<BankDetails>){
        await bankDetailsRepository.update({ applicationNo }, data);
        return await bankDetailsRepository.findOneBy({ applicationNo });
    }

    // Delete BankDetails by applicationNo
    static async deleteBankDetailsByApplicationNo(applicationNo: string): Promise<string> {
        const result = await bankDetailsRepository.delete({ applicationNo });
        if (result.affected === 0) {
            throw new Error('Bank Details not found');
        }
        return 'Bank Details deleted';
    }
}
