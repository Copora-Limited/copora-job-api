import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { NextOfKin } from '../entities/NextOfKinEntity';
import { NextOfKinService } from '../services/NextOfKinService';

import { UserService } from '../services/UserService';
import {validatePhone} from '../utils/formValidation';

const nextOfKinRepository = AppDataSource.getRepository(NextOfKin);
export class NextOfKinController {
    

    public static async create(req: Request, res: Response) {
        const { applicationNo, firstName, lastname, relationship, email, phoneNumber, address} = req.body;

        try {
             // Check if all required fields are provided
             if (!firstName) {
                return res.status(400).json({ statusCode: 400, message: 'First Name is required' });
            }
            if (!lastname) {
                return res.status(400).json({ statusCode: 400, message: 'Last Name is required' });
            }
            if (!relationship) {
                return res.status(400).json({ statusCode: 400, message: 'Select Relationship is required' });
            }
            if (!phoneNumber) {
                return res.status(400).json({ statusCode: 400, message: 'Phone Number is required' });
            }

            if (!validatePhone(phoneNumber)) {
                return res.status(400).json({
                    message: 'Phone number should be a valid UK number (starting with +44 or 44 followed by 10 digits, or 10-11 digits locally) or a valid international format (+ followed by 10-15 digits).'
                });
            }
            if (!email) {
                return res.status(400).json({ statusCode: 400, message: 'Email is required' });
            }
            if (!address) {
                return res.status(400).json({ statusCode: 400, message: 'Address is required' });
            }

            // Validate applicationNo
            const existingApplicant = await UserService.findApplicationNo(applicationNo);
            if (!existingApplicant) {
                return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
            }

            // Check if an entry with the given applicationNo already exists
            let existingEntry = await nextOfKinRepository.findOneBy({ applicationNo });

            if (existingEntry) {
                // Update the existing entry with the new data
                const updateRecord = { ...req.body, attempted: true };
                nextOfKinRepository.merge(existingEntry, updateRecord);
                await nextOfKinRepository.save(existingEntry);
                return res.status(200).send({ message: 'Emergency Contact updated Sucessfully', data: existingEntry }); // Return updated entry
            } else {
                // Create a new entry if none exists
                const nextOfKin = nextOfKinRepository.create({...req.body, attempted: true});
                await nextOfKinRepository.save(nextOfKin);
                return res.status(201).send({ message: 'Emergency Contact created Sucessfully', data: nextOfKin }); // Return newly created entry
            }
        } catch (error) {
            console.error('Error creating/updating NextOfKin:', error);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }

    public static async getAll(req: Request, res: Response) {
        const nextOfKin = await nextOfKinRepository.find();
        res.status(200).send(nextOfKin);
    }

    public static async getById(req: Request, res: Response) {
        const nextOfKin = await nextOfKinRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!nextOfKin) {
            return res.status(404).send('Emergency Contact not found');
        }
        res.status(200).send(nextOfKin);
    }

    public static async getByApplicationNo(req: Request, res: Response) {
        console.log("req:", req.params)
        try {
            const { applicationNo } = req.params;
            const entry = await NextOfKinService.getNextOfKinByApplicationNo(applicationNo);
            console.log("entry:", entry)

            if (!entry) {
                return res.status(404).send({ message: 'Next of Kin not found' });
            }
            res.status(200).send(entry);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching Next of Kin', error: error.message });
        }
    }

    public static async update(req: Request, res: Response) {
        const nextOfKin = await nextOfKinRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!nextOfKin) {
            return res.status(404).send('Emergency Contact not found');
        }
        Object.assign(nextOfKin, req.body);
        await nextOfKinRepository.save(nextOfKin);
        res.status(200).send(nextOfKin);
    }

    public static async delete(req: Request, res: Response) {
        const result = await nextOfKinRepository.delete({ id: parseInt(req.params.id) });
        if (result.affected === 0) {
            return res.status(404).send('Emergency Contact not found');
        }
        res.status(200).send('Emergency Contact deleted');
    }
}
