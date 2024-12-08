import { Router } from 'express';
import { getStudentQueries, submitQuery, viewAssignedQueries, updateQuery } from '../controllers/query';
import { create, login } from '../controllers/user';
import { validate } from '../middleware/validateSchema';
import { submitQuerySchema } from '../validators/querySchema';
import { verifyJWT } from '../middleware/verifyJwt';
import { verifyRole } from '../middleware/verifyRole';
import { createUserSchema } from '../validators/userSchema';
import { loginSchema } from '../validators/loginSchema';
import { upload } from '../middleware/upload';

const router = Router();
router.post('/queries', verifyJWT, upload.single('file'), validate(submitQuerySchema), submitQuery);
router.get('/queries', verifyJWT, getStudentQueries);

router.get('/queries/assigned', verifyJWT, verifyRole(['Resolver']), viewAssignedQueries);
router.put('/queries/:id', verifyJWT, verifyRole(['Resolver']), updateQuery);

router.post('/user/signup', validate(createUserSchema), create);
router.post('/user/login', validate(loginSchema), login);

export default router;