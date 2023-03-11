import { Router } from 'express';
import { create, getAll, getOne, update, remove } from '../controllers/post.controller';
import { authVerify } from '../middlewares/authVerify.middleware';

const router = Router();

router.get('/', authVerify, getAll);
router.get('/:id', authVerify, getOne);
router.post('/', authVerify, create);
router.put('/:id', authVerify, update);
router.delete('/:id', authVerify, remove);

export { router };
