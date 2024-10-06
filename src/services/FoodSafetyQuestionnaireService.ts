import { FoodSafetyQuestionnaire } from '../entities/FoodSafetyQuestionnaireEntity';
import { AppDataSource } from '../data-source';

export class FoodSafetyQuestionnaireService {
    private foodSafetyQuestionnaireRepository = AppDataSource.getRepository(FoodSafetyQuestionnaire);

    // Create a new FoodSafetyQuestionnaire
    async createFoodSafetyQuestionnaire(data: Partial<FoodSafetyQuestionnaire>): Promise<FoodSafetyQuestionnaire> {
        const foodSafetyQuestionnaire = this.foodSafetyQuestionnaireRepository.create(data);
        return await this.foodSafetyQuestionnaireRepository.save(foodSafetyQuestionnaire);
    }

    // Get FoodSafetyQuestionnaire by applicationNo
    async getFoodSafetyQuestionnaireByApplicationNo(applicationNo: string): Promise<FoodSafetyQuestionnaire | null> {
        return await this.foodSafetyQuestionnaireRepository.findOneBy({ applicationNo });
    }

    // Update FoodSafetyQuestionnaire by applicationNo
    async updateFoodSafetyQuestionnaireByApplicationNo(applicationNo: string, data: Partial<FoodSafetyQuestionnaire>): Promise<FoodSafetyQuestionnaire | null> {
        await this.foodSafetyQuestionnaireRepository.update({ applicationNo }, data);
        return await this.foodSafetyQuestionnaireRepository.findOneBy({ applicationNo });
    }

    // Delete FoodSafetyQuestionnaire by applicationNo
    async deleteFoodSafetyQuestionnaireByApplicationNo(applicationNo: string): Promise<string> {
        const result = await this.foodSafetyQuestionnaireRepository.delete({ applicationNo });
        if (result.affected === 0) {
            throw new Error('Food Safety Questionnaire not found');
        }
        return 'Food Safety Questionnaire deleted';
    }
}
