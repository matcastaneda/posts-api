import { Router } from 'express';
import { create, getAll, getOne, update, remove } from '../controllers/post.controller';

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export { router };
