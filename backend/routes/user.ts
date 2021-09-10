import express from 'express';
import controllerUser from '../controllers/user';

const router = express.Router();

/** validate token */
router.get('/validate', controllerUser.validateToken);

/** register */
router.post('/register', controllerUser.register);

/** signin */
router.post('/signin', controllerUser.signin);
export = router;
