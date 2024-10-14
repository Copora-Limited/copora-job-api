import { Router } from 'express';
import { JobTitleController } from '../controllers/JobTitleController';

const router = Router();
const jobTitleController = new JobTitleController();

router.get('/', jobTitleController.getAll.bind(jobTitleController));
router.get('/:id', jobTitleController.getById.bind(jobTitleController));
router.post('/', jobTitleController.create.bind(jobTitleController));
router.put('/:id', jobTitleController.update.bind(jobTitleController));
router.delete('/:id', jobTitleController.delete.bind(jobTitleController));

export default router;
