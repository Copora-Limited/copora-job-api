import { Request, Response } from 'express';
import { EmploymentTypeService } from '../services/EmploymentTypeService';
export class EmploymentTypeController {
    // Create or update employment type based on id
    static async create(req: Request, res: Response) {
        try {
            const employmentTypesData = req.body; // Expecting an array of employment type data
            const newEmploymentTypes = [];
    
            for (const employmentTypeData of employmentTypesData) {
                // Check if the employment type already exists by name (or any other criteria you prefer)
                const existingEmploymentType = await EmploymentTypeService.getByName(employmentTypeData.name);
    
                if (existingEmploymentType) {
                    // If it exists, throw an error
                    throw new Error(`Record already exists for employment type: ${employmentTypeData.name}`);
                }
    
                // If it doesn't exist, create a new one
                const newEmploymentType = await EmploymentTypeService.create(employmentTypeData);
                newEmploymentTypes.push(newEmploymentType);
            }
    
            res.status(201).json({ message: "Created Successfully", data: newEmploymentTypes });
        } catch (error) {
            res.status(400).json({ message: 'Error creating employment types', error: error.message });
        }
    }
    

    // Get all Employment Types
    static async getAll(req: Request, res: Response) {
        try {
            const employmentTypes = await EmploymentTypeService.getAll();
            res.status(200).json(employmentTypes);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching employment types', error: error.message });
        }
    }

    // Get Employment Type by ID
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
    
            // Convert id to a number
            const numericId = parseInt(id, 10);
            
            // Check if the id is a valid number
            if (isNaN(numericId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
    
            const employmentType = await EmploymentTypeService.getById(numericId);
            if (!employmentType) {
                return res.status(404).send({ message: 'Employment Type not found' });
            }
            res.status(200).send(employmentType);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching employment type', error: error.message });
        }
    }
    

    // Update Employment Type by ID
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
    
            // Convert id to a number
            const numericId = parseInt(id, 10);
            
            // Check if the id is a valid number
            if (isNaN(numericId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
    
            const updatedEmploymentType = await EmploymentTypeService.update(numericId, req.body);
            
            if (!updatedEmploymentType) {
                return res.status(404).send({ message: 'Employment Type not found' });
            }
    
            res.status(200).send(updatedEmploymentType);
        } catch (error) {
            res.status(400).send({ message: 'Error updating employment type', error: error.message });
        }
    }
    

    // Delete Employment Type by ID
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
    
            // Convert id to a number
            const numericId = parseInt(id, 10);
            
            // Check if the id is a valid number
            if (isNaN(numericId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
    
            const message = await EmploymentTypeService.delete(numericId);
            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
    
}
