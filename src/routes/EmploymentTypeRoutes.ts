import { Router } from 'express';
import { EmploymentTypeController } from '../controllers/EmploymentTypeController';

const router = Router();
const employmentTypeController = new EmploymentTypeController();

router.get('/', employmentTypeController.getAll.bind(employmentTypeController));
router.get('/:id', employmentTypeController.getById.bind(employmentTypeController));
router.post('/', employmentTypeController.create.bind(employmentTypeController));
router.put('/:id', employmentTypeController.update.bind(employmentTypeController));
router.delete('/:id', employmentTypeController.delete.bind(employmentTypeController));

export default router;
