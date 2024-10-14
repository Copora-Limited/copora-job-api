import { Router } from 'express';
import { GroupController } from '../controllers/GroupController';

const router = Router();
const groupController = new GroupController();

router.get('/', groupController.getAll.bind(groupController));
router.get('/:id', groupController.getById.bind(groupController));
router.post('/', groupController.create.bind(groupController));
router.put('/:id', groupController.update.bind(groupController));
router.delete('/:id', groupController.delete.bind(groupController));

export default router;
