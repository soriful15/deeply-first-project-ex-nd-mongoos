import { Request, Response } from 'express';
import { StudentService } from './student.service';
import studentValidationSchema from './student.Zodvalidation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body; // suru hoise
    const zodParseData = studentValidationSchema.parse(studentData);

    const result = await StudentService.createStudentIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student is getData successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is getSingleStudents successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudents,
};
