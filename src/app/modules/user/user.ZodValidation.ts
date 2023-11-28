/* import { z } from 'zod';

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .max(20, { message: 'Password can not be more than 20 characters' }),
  needsPasswordChange: z.boolean().default(true).optional(),
  role: z.enum(['admin', 'student', 'faculty']),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  isDeleted: z.boolean().optional().default(false),
});
export default userValidationSchema; */

import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'password must be a string' })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
});
export default userValidationSchema;
