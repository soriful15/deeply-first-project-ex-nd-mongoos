/* import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudents);
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router; */

import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchema } from './student.Zodvalidation';

const router = express.Router();
router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudents);
router.delete('/:id', StudentControllers.deleteStudent);
router.patch(
  '/:id',
  validateRequest(studentValidationSchema.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

export const StudentRoutes = router;
