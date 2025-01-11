import { GeneralInfo } from '../entities/GeneralInfoEntity';
import { AppDataSource } from '../data-source';

const generalInfoRepository = AppDataSource.getRepository(GeneralInfo);

export class GeneralInfoService {
    // Create a new PersonalDetails entry
    static async create(data: any) {
        const entry = generalInfoRepository.create(data);
        return await generalInfoRepository.save(entry);
    }

    // Get all PersonalDetails entries
    static async getAll() {
        return await generalInfoRepository.find();
    }

    // Get PersonalDetails entry by applicationNo
    static async getByApplicationNo(applicationNo: string) {
        return await generalInfoRepository.findOneBy({ applicationNo });
    }

    static async getOneByApplicationNo(applicationNo: string) {
        const data = await generalInfoRepository.findOneBy({ applicationNo });

        if (!data) {
            throw new Error("General information not found.");
        }

        // Transform the data to ensure proper typing
        return {
            id: data.id,
            applicationNo: data.applicationNo,
            plateWaiting: data.plateWaiting === "true",
            retailCashier: data.retailCashier === "true",
            barWork: data.barWork === "true",
            hospitality: data.hospitality === "true",
            foodService: data.foodService === "true",
            barista: data.barista === "true",
            supervising: data.supervising === "true",
            level2FoodHygieneCertificate: data.level2FoodHygieneCertificate === "true",
            level2FoodHygieneCertificateUpload: data.level2FoodHygieneCertificateUpload || null,
            personalLicenseHolder: data.personalLicenseHolder === "true",
            personalLicenseCertificateUpload: data.personalLicenseCertificateUpload || null,
            dbsDisclosureAndBarringService: data.dbsDisclosureAndBarringService === "true",
            dbsCertificateUpload: data.dbsCertificateUpload || null,
            attempted: Boolean(data.attempted),
        };
    }

    // Update PersonalDetails entry by applicationNo
    static async updateByApplicationNo(applicationNo: string, data: any) {
        const entry = await this.getByApplicationNo(applicationNo);
        if (!entry) {
            throw new Error('General details not found');
        }
        Object.assign(entry, data);
        return await generalInfoRepository.save(entry);
    }

    // Delete PersonalDetails entry by applicationNo
    static async deleteByApplicationNo(applicationNo: string) {
        const result = await generalInfoRepository.delete({ applicationNo });
        if (result.affected === 0) {
            throw new Error('General details not found');
        }
        return 'General details deleted';
    }
}
