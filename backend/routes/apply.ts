import express from 'express';
import extractJWT from '../middlewares/extractJWT';
import controllerApply from '../controllers/apply';

const router = express.Router();

/** populate db */
router.get('/seed', controllerApply.seed);
/** get all current user applies */
router.get('/all', controllerApply.getAll);
/** get apply by id */
router.get('/get/:id', extractJWT, controllerApply.getById);
/** add new apply */
router.post('/register', extractJWT, controllerApply.register);
/** edit apply */
router.put('/edit', extractJWT, controllerApply.edit);
/** delete apply */
router.delete('/delete', extractJWT, controllerApply.del);

export = router;
