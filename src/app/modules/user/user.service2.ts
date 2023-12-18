/* import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { generateStudentId } from './user.utils';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given , use deafult password
  // if(!password){
  //    user.password=config.default_password as string
  // }
  // else{
  //     user.password=password
  // }
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND,'error hoise');
  }



  // set manually generated it
  // userData.id = '2030100001';
  userData.id = await generateStudentId(admissionSemester);

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;
  }

  const newStudent = await Student.create(payload);
  return newStudent;
};

export const UserService = {
  createStudentIntoDB,
};
 */
