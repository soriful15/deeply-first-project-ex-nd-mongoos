/* import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    // static method
    throw new Error('User already exists!');
  }

  const result = await Student.create(studentData); */ //built in static method

/*   const student = new Student(studentData); // create an instance
  // const result = await student.save(); // built in instance method

  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }
  const result = await student.save(); // built in instance method */

/* return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentDB = async (id: string) => {
  // const result = await Student.findOne({ id });  // normal findOne er jonno
  const result = await Student.aggregate([{ $match: { id } }]); // aggregate findOne er jonno
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentDB,
  deleteStudentFromDB,
}; */

import { Student } from './student.model';
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentDB = async (id: string) => {
  // const result = await Student.findOne({ id });  // normal findOne er jonno
  const result = await Student.aggregate([{ $match: { id } }]); // aggregate findOne er jonno
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentDB,
  deleteStudentFromDB,
};
