import express from 'express';
import controller from '../controllers/poem';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/read/:poemID', controller.read);
router.post('/create', controller.create);
router.post('/query', controller.query);
router.delete('/delete', controller.deletePoem);

export default router;
