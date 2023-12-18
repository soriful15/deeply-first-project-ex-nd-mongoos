// import { Request, Response } from 'express';
// import { StudentService } from './student.service';
// import studentValidationSchema from './student.Zodvalidation';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body; // suru hoise
//     const zodParseData = studentValidationSchema.parse(studentData);

//     const result = await StudentService.createStudentIntoDB(zodParseData);
//     res.status(200).json({
//       success: true,
//       message: 'Student is created successfully',
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || 'something went wrong',
//       error: error,
//     });
//   }
// };

// const getAllStudents = async (req: Request, res: Response) => {
//   try {
//     const result = await StudentService.getAllStudentsFromDB();
//     res.status(200).json({
//       success: true,
//       message: 'Student is getData successfully',
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || 'something went wrong',
//       error: error,
//     });
//   }
// };
// const getSingleStudents = async (req: Request, res: Response) => {
//   try {
//     const { studentId } = req.params;
//     const result = await StudentService.getSingleStudentDB(studentId);
//     res.status(200).json({
//       success: true,
//       message: 'Student is getSingleStudents successfully',
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || 'something went wrong',
//       error: error,
//     });
//   }
// };

// const deleteStudent = async (req: Request, res: Response) => {
//   try {
//     const { studentId } = req.params;
//     const result = await StudentService.deleteStudentFromDB(studentId);
//     res.status(200).json({
//       success: true,
//       message: 'Student is deleted succesfully',
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || 'something went wrong',
//       error: error,
//     });
//   }
// };

// export const StudentControllers = {
//   createStudent,
//   getAllStudents,
//   getSingleStudents,
//   deleteStudent,
// };

import { RequestHandler } from 'express';
import { StudentService } from './student.service';
import httpStatus from 'http-status';
import sendResponse from '../utils/sendResponse';
import catchAsync from '../utils/catchAsync';

const getSingleStudents = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.getSingleStudentDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is single data successfully',
    data: result,
  });
});

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  // console.log(req.query);
  const result = await StudentService.getAllStudentsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is all data successfully',
    data: result,
  });
  // console.log(result);
});
const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentService.updateStudentIntoDB(id, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.deleteStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is delete successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteStudent,
  updateStudent,
};
