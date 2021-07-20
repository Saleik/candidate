import express from 'express';
import controllerApply from '../controllers/apply';

const router = express.Router();

/** populate db */
router.get('/seed', controllerApply.seed);
/** add new apply */
router.post('/register', controllerApply.register);
/** get all current user applies */
router.get('/all', controllerApply.getAll);

export = router;
