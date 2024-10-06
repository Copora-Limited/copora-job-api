import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { NextOfKin } from '../entities/NextOfKinEntity';
import { UserService } from '../services/UserService';

export class NextOfKinController {
    private nextOfKinRepository = AppDataSource.getRepository(NextOfKin);

    async create(req: Request, res: Response) {
        const { applicationNo } = req.body;
        try {
            const existingApplicant = await UserService.findApplicationNo(applicationNo);

            if(!existingApplicant){
                return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
            }
            
            // Check if an entry with the given applicationNo already exists
            let existingEntry = await this.nextOfKinRepository.findOneBy({ applicationNo });

            if (existingEntry) {
                // Update the existing entry with the new data
                this.nextOfKinRepository.merge(existingEntry, req.body);
                await this.nextOfKinRepository.save(existingEntry);
                return res.status(200).send({message: 'Next of Kin updated', data: existingEntry}); // Return updated entry
            } else {
                // Create a new entry if none exists
                const nextOfKin = this.nextOfKinRepository.create(req.body);
                await this.nextOfKinRepository.save(nextOfKin);
                return res.status(201).send({ message: 'Entry created', data: nextOfKin }); // Return newly created entry

            }
        } catch (error) {
            console.error('Error creating/updating NextOfKin:', error);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }

    async getAll(req: Request, res: Response) {
        const nextOfKin = await this.nextOfKinRepository.find();
        res.status(200).send(nextOfKin);
    }

    async getById(req: Request, res: Response) {
        const nextOfKin = await this.nextOfKinRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!nextOfKin) {
            return res.status(404).send('Next of Kin not found');
        }
        res.status(200).send(nextOfKin);
    }

    async update(req: Request, res: Response) {
        const nextOfKin = await this.nextOfKinRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!nextOfKin) {
            return res.status(404).send('Next of Kin not found');
        }
        Object.assign(nextOfKin, req.body);
        await this.nextOfKinRepository.save(nextOfKin);
        res.status(200).send(nextOfKin);
    }

    async delete(req: Request, res: Response) {
        const result = await this.nextOfKinRepository.delete({ id: parseInt(req.params.id) });
        if (result.affected === 0) {
            return res.status(404).send('Next of Kin not found');
        }
        res.status(200).send('Next of Kin deleted');
    }
}
