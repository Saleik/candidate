import express from 'express';
import extractJWT from '../middlewares/extractJWT';
import controllerApply from '../controllers/apply';

const router = express.Router();

/** populate db */
router.get('/seed', controllerApply.seed);
/** add new apply */
router.post('/register', extractJWT, controllerApply.register);
/** get all current user applies */
router.get('/all', controllerApply.getAll);
/** delete apply */
/* router.get('/delete', controllerApply.delete); */

export = router;
