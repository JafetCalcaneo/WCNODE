import { Router } from 'express';
const router = Router();
import * as salesCtrl from '../controllers/sales.controller.js';

// import  * as authCtrl from '../controllers/auth.controller';
// import {verifySignup, authJwt} from '../middlewares';

// router.post('/signup', [verifySignup.checkDuplicatedUsernameOrEmail,
// verifySignup.checkRolesExisted], authCtrl.signUp);

router.post('/create', salesCtrl.createOrder)

export default router;