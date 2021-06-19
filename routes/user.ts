import express from 'express';
import controllerUser from '../controllers/user';

const router = express.Router();

/** populate db */
router.get('/seed', controllerUser.seed);

/** validate token */
router.get('/validate', controllerUser.validateToken);

/** register */
router.post('/register', controllerUser.register);

/** login */
router.post('/signin', controllerUser.login);
export = router;
