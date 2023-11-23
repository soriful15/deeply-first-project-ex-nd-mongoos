/* import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await Student.create(studentData); //built in static method

  const student = new Student(studentData); // create an instance
  // const result = await student.save(); // built in instance method

  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }
  const result = await student.save(); // built in instance method

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServiceInterface = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentDB,
};
 */
