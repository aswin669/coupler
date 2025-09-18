import { ProfileStatus, Role } from '@prisma/client';

export const userSchema = {
  type: 'object',
  required: ['id', 'fullName', 'email'],
  properties: {
    id: { type: 'string' },
    fullName: { type: 'string' },
    email: { type: 'string', format: 'email' },
    emailVerified: { type: 'boolean' },
    role: { type: 'string', enum: Object.values(Role) },
    password: { type: 'string' },
    mobileNumber: { type: 'string' },
    mobileNumberVerified: { type: 'boolean' },
    dob: { type: 'string', format: 'date-time' },
    gender: { type: 'string' },
    profileStatus: { type: 'string', enum: Object.values(ProfileStatus) },
    referralCode: { type: 'string' },
    referredById: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
    deletedAt: { type: 'string', format: 'date-time' },
  },
};

export const createUserSchema = {
  type: 'object',
  required: ['fullName', 'email'],
  properties: {
    fullName: { type: 'string', minLength: 2, maxLength: 100 },
    email: { type: 'string', format: 'email' },
    role: { type: 'string', enum: Object.values(Role) },
    password: { type: 'string' },
    mobileNumber: { type: 'string' },
    dob: { type: 'string', format: 'date-time' },
    gender: { type: 'string' },
    profileStatus: { type: 'string', enum: Object.values(ProfileStatus) },
  },
};

export const updateUserSchema = {
  type: 'object',
  properties: {
    fullName: { type: 'string', minLength: 2, maxLength: 100 },
    email: { type: 'string', format: 'email' },
    emailVerified: { type: 'boolean' },
    role: { type: 'string', enum: Object.values(Role) },
    password: { type: 'string' },
    mobileNumber: { type: 'string' },
    mobileNumberVerified: { type: 'boolean' },
    dob: { type: 'string', format: 'date-time' },
    gender: { type: 'string' },
    profileStatus: { type: 'string', enum: Object.values(ProfileStatus) },
  },
  minProperties: 1,
};

export const userParamsSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string' },
  },
};

export const usersResponseSchema = {
  type: 'object',
  properties: {
    users: {
      type: 'array',
      items: userSchema,
    },
    total: { type: 'integer' },
    page: { type: 'integer' },
    limit: { type: 'integer' },
  },
};
