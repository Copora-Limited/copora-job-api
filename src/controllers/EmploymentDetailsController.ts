import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { EmploymentDetails } from '../entities/EmploymentDetailsEntity';

export class EmploymentDetailsController {
    private employmentDetailsRepository = AppDataSource.getRepository(EmploymentDetails);

    async create(req: Request, res: Response) {
        const employmentDetails = this.employmentDetailsRepository.create(req.body);
        await this.employmentDetailsRepository.save(employmentDetails);
        res.status(201).send(employmentDetails);
    }

    async getAll(req: Request, res: Response) {
        const employmentDetails = await this.employmentDetailsRepository.find();
        res.status(200).send(employmentDetails);
    }

    async getById(req: Request, res: Response) {
        const employmentDetails = await this.employmentDetailsRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!employmentDetails) {
            return res.status(404).send('Employment Details not found');
        }
        res.status(200).send(employmentDetails);
    }

    async update(req: Request, res: Response) {
        const employmentDetails = await this.employmentDetailsRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!employmentDetails) {
            return res.status(404).send('Employment Details not found');
        }
        Object.assign(employmentDetails, req.body);
        await this.employmentDetailsRepository.save(employmentDetails);
        res.status(200).send(employmentDetails);
    }

    async delete(req: Request, res: Response) {
        const result = await this.employmentDetailsRepository.delete({ id: parseInt(req.params.id) });
        if (result.affected === 0) {
            return res.status(404).send('Employment Details not found');
        }
        res.status(200).send('Employment Details deleted');
    }
}
