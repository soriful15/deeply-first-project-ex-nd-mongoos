/* import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';
import validator from 'validator';
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is Required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 Characters'],
     validate: {
      validator: function (value: string) { // normal validator
        const FirstNameCase = value.charAt(0).toUpperCase() + value.slice(1);
        // if(value !== FirstNameCase){
        //   return false
        // }
        // return true
        return FirstNameCase === value; // upor oi jinis ta short cut kore likha hoise
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is Required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 Characters'],
    validate: { // package validator
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father Name is Required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father Occupation is Required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father ContactNo is Required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is Required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is Required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother ContactNo  is Required'],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, ' Name is Required'],
  },
  occupation: {
    type: String,
    required: [true, 'occupation is Required'],
  },
  contactNo: {
    type: String,
    required: [true, 'contactNo is Required'],
  },
  address: {
    type: String,
    required: [true, 'address is Required'],
  },
});

const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: '{VALUE} is not a valid gender',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
     validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid',
    },
  },
  contactNo: { type: String, required: [true, ' contactNo is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'emergencyContactNo is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{values} is not a valid blood group',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'permanentAddress address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, ' guardian is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'local Guardian is required'],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
 */
