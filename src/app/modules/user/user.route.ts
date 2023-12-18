import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchema } from '../student/student.Zodvalidation';
import { studentValidations } from '../../Faculty/faculty.validation';
import { AdminValidations } from '../../Admin/admin.validation';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidationSchema.studentValidation),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(studentValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
