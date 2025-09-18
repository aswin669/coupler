import { ApprovalStatus, ProfileStatus, Role } from '@prisma/client';

export class User {
  public id?: string;
  public email?: string;
  public emailVerified: boolean;
  public fullName?: string | null;
  public role: Role;
  public password?: string | null;
  public mobileNumber?: string | null;
  public mobileNumberVerified: boolean;
  public dob?: Date | null;
  public gender: string | null;
  public avatar?: string | null;
  public profileStatus: ProfileStatus;
  public referralCode?: string;
  public referredById?: string | null;
  public approvalStatus?: ApprovalStatus | null;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt?: Date | null;
  public files?: File[] | null;
  public createdById?: string;

  constructor(user: {
    id?: string;
    email?: string;
    emailVerified?: boolean;
    fullName?: string | null;
    role: Role;
    password?: string | null;
    mobileNumber?: string | null;
    mobileNumberVerified?: boolean;
    dob?: Date | null;
    gender: string | null;
    avatar?: string | null;
    profileStatus: ProfileStatus;
    referralCode?: string;
    referredById?: string | null;
    approvalStatus?: ApprovalStatus | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    files?: File[] | null;
    createdById?: string;
  }) {
    this.id = user.id;
    this.email = user.email;
    this.emailVerified = user.emailVerified || false;
    this.fullName = user.fullName;
    this.role = user.role;
    this.password = user.password;
    this.mobileNumber = user.mobileNumber;
    this.mobileNumberVerified = user.mobileNumberVerified || false;
    this.dob = user.dob;
    this.gender = user.gender;
    this.avatar = user.avatar;
    this.profileStatus = user.profileStatus;
    this.referralCode = user.referralCode;
    this.referredById = user.referredById;
    this.approvalStatus = user.approvalStatus;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
    this.files = user.files;
    this.createdById = user.createdById;
  }
}
