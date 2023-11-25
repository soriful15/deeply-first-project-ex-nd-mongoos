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

const studentValidationSchema = z.object({
  id: z.string().min(1, { message: 'ID is required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(20, { message: 'Password can not be more than 20 characters' }),
  name: userNameSchema,
  gender: z.enum(['male', 'female', 'others']),
  dateOfBirth: z.string(),
  email: z
    .string()
    .email({ message: 'Email is not valid' })
    .min(1, { message: 'Email is required' }),
  contactNo: z.string().min(1, { message: 'ContactNo is required' }),
  emergencyContactNo: z
    .string()
    .min(1, { message: 'EmergencyContactNo is required' }),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string().min(1, { message: 'Present address is required' }),
  permanentAddress: z
    .string()
    .min(1, { message: 'PermanentAddress address is required' }),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().optional().default(false),
});

export default studentValidationSchema;
