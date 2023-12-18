/* // mongoose er validation
import { Schema, model } from 'mongoose';
import {
  // StudentMethod,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import validator from 'validator';
import config from '../../config';
import bcrypt from 'bcrypt';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is Required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 Characters'],
    validate: {
      validator: function (value: string) {
        const FirstNameCase = value.charAt(0).toUpperCase() + value.slice(1);
        return FirstNameCase === value;
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
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
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

const localGuardianSchema = new Schema<TLocalGuardian>({
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

// const studentSchema = new Schema<TStudent, StudentModel, StudentMethod>({ //creating a custom instance method
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      // unique: true, // uniqe true comment korar karon onk time a password ak rokom hoite pare
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      maxlength: [20, 'Password can not be more than 20 characters'],
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
      enum: {
        values: ['active', 'blocked'],
        message: '{VALUE} is not a valid status',
      },
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// pre save middleware/ hook : will work on create()  save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'per hok: we will save data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds), //  bcrypt all mtime hoi tai number diye atkiye rakha hoise
  );

  next();
});

// post save middleware / hook
studentSchema.post('save', function (doc, next) {
  // console.log(this, 'post hok: we will save data');
  doc.password = '';
  next();
});

// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } }); // unshift hocche sobar aghe id ta hit kore then is deeleted er sathe hit khabe then baad pore jabe
  // console.log(this.pipeline());
  next();
});

// //creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);

/* //creating a custom instance method
studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
export const Student = model<TStudent, StudentModel>('Student', studentSchema); */

// mongoose er validation
import { Schema, model } from 'mongoose';
import {
  // StudentMethod,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import validator from 'validator';
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is Required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 Characters'],
    validate: {
      validator: function (value: string) {
        const FirstNameCase = value.charAt(0).toUpperCase() + value.slice(1);
        return FirstNameCase === value;
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
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
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

const localGuardianSchema = new Schema<TLocalGuardian>({
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
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
      // unique: true, // uniqe true comment korar karon onk time a password ak rokom hoite pare
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is required'],
      unique: true,
      ref: 'User',
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
    dateOfBirth: { type: Date },
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
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});
// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } }); // unshift hocche sobar aghe id ta hit kore then is deeleted er sathe hit khabe then baad pore jabe
  // console.log(this.pipeline());
  next();
});

// //creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
