import { z } from 'zod';
import validator from 'validator';
const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First Name is Required' })
    .max(20, { message: 'Name can not be more than 20 Characters' })
    .refine(
      (value) => {
        const FirstNameCase = value.charAt(0).toUpperCase() + value.slice(1);
        return FirstNameCase === value;
      },
      { message: 'First Name should be in capitalize format' },
    ),
  middleName: z.string(),
  lastName: z
    .string()
    .min(1, { message: 'Last Name is Required' })
    .max(20, { message: 'Name can not be more than 20 Characters' })
    .refine((value) => validator.isAlpha(value), {
      message: 'Last Name is not valid',
    }),
});

const guardianSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father Name is Required' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father Occupation is Required' }),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father ContactNo is Required' }),
  motherName: z.string().min(1, { message: 'Mother Name is Required' }),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother Occupation is Required' }),
  motherContactNo: z
    .string()
    .min(1, { message: 'Mother ContactNo is Required' }),
});

const localGuardianSchema = z.object({
  name: z.string().min(1, { message: 'Name is Required' }),
  occupation: z.string().min(1, { message: 'Occupation is Required' }),
  contactNo: z.string().min(1, { message: 'ContactNo is Required' }),
  address: z.string().min(1, { message: 'Address is Required' }),
});

// const studentValidationSchema = z.object({
const studentValidation = z.object({
  body: z.object({
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .max(20, { message: 'Password can not be more than 20 characters' }),
    student: z.object({
      name: userNameSchema,
      gender: z.enum(['male', 'female', 'others']),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email({ message: 'Email is not valid' })
        .min(1, { message: 'Email is required' }),
      contactNo: z.string().min(1, { message: 'ContactNo is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'EmergencyContactNo is required' }),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }),
      permanentAddress: z
        .string()
        .min(1, { message: 'PermanentAddress address is required' }),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      admissionSemester: z.string(),
      profileImg: z.string(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidationSchema = {
  studentValidation,
  updateStudentValidationSchema,
};
