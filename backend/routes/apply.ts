import express from 'express';
import extractJWT from '../middlewares/extractJWT';
import controllerApply from '../controllers/apply';

const router = express.Router();

/** populate db */
router.get('/seed', controllerApply.seed);
/** get all current user applies */
router.get('/all', controllerApply.getAll);
/** add new apply */
router.post('/register', extractJWT, controllerApply.register);
/** delete apply */
router.delete('/delete', extractJWT, controllerApply.del);

export = router;
