// aita student.controller 1 er akta ongso but aita karo sathe connect na

// import { Request, Response } from 'express';
// import { StudentService } from './student.service';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body;
//     const result = await StudentService.createStudentIntoDB(studentData);
//     res.status(200).json({
//       success: true,
//       message: 'Student is created successfully',
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'something went wrong',
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
//   } catch (error) {
//     console.log(error);
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
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const StudentControllers2 = {
//   createStudent,
//   getAllStudents,
//   getSingleStudents,
// };
