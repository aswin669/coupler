import { User } from '@domain/entities';
import { IUserRepository, UserFromRepo } from '@domain/repositories';
import { Prisma, PrismaClient, Role, User as UserModel } from '@prisma/client';

export class UserRepository implements IUserRepository {
  constructor(private readonly db: PrismaClient) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<{ users: User[]; count: number }> {
    const { skip, take, where, orderBy } = params;

    const [users, count] = await Promise.all([
      this.db.user.findMany({
        skip,
        take,
        where,
        orderBy,
      }),
      this.db.user.count({ where }),
    ]);

    return { users: users.map(toEntity), count };
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: { id },
    });
    return user ? toEntity(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: { email },
    });
    return user ? toEntity(user) : null;
  }

  async findByMobileNumber(mobileNumber: string): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: { mobileNumber },
    });
    return user ? toEntity(user) : null;
  }

  async findByEmailOrMobileNumber(email: string, mobileNumber: string): Promise<User | null> {
    const user = await this.db.user.findFirst({
      where: {
        OR: [{ email }, { mobileNumber }],
      },
    });
    return user ? toEntity(user) : null;
  }

  async findIdByReferralCode(code: string): Promise<{ id: string } | null> {
    const user = await this.db.user.findUnique({
      where: {
        referralCode: code,
      },
      select: { id: true },
    });
    return user ? { id: user.id } : null;
  }

  async create(user: User): Promise<{ id: string }> {
    const { id } = await this.db.user.create({
      data: {
        email: user.email,
        emailVerified: user.emailVerified,
        fullName: user.fullName,
        role: user.role,
        password: user.password,
        mobileNumber: user.mobileNumber,
        mobileNumberVerified: user.mobileNumberVerified,
        dob: user.dob,
        gender: user.gender,
        profileStatus: user.profileStatus,
        referralCode: user.referralCode,
        referredById: user.referredById,
        approvalStatus: user.approvalStatus,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      },
      select: { id: true },
    });

    return { id };
  }

  async update(id: string, data: Prisma.UserUpdateInput | Prisma.UserUncheckedUpdateInput): Promise<{ id: string }> {
    const updatedUser = await this.db.user.update({
      where: { id },
      data,
      select: { id: true },
    });
    return { id: updatedUser.id };
  }

  async delete(id: string): Promise<boolean> {
    await this.db.user.delete({
      where: { id },
    });
    return true;
  }

  async findUsers(params: {
    skip: number;
    take: number;
    filter: 'ALL' | 'NEW' | 'APPROVED';
    role?: Role;
    location?: string;
    gender?: string;
    qualifications?: string[];
    search?: string;
  }): Promise<{ users: UserFromRepo[]; count: number }> {
    const whereClauses: Prisma.Sql[] = [
      Prisma.sql`u.deleted_at IS NULL`,
      Prisma.sql`a.deleted_at IS NULL`,
      Prisma.sql`n.deleted_at IS NULL`,
    ];

    if (params.filter === 'NEW') {
      whereClauses.push(Prisma.sql`u.approval_status = 'PENDING'`);
    } else if (params.filter === 'APPROVED') {
      whereClauses.push(Prisma.sql`u.approval_status = 'APPROVED'`);
    }

    if (params.location) {
      whereClauses.push(Prisma.sql`a.city = ${params.location}`);
    }

    if (params.role) {
      whereClauses.push(Prisma.sql`u.role = ${params.role}::"Role"`);
    }

    if (params.gender) {
      whereClauses.push(Prisma.sql`u.gender = ${params.gender}::"Gender"`);
    }

    if (params.qualifications && params.qualifications.length > 0) {
      whereClauses.push(
        Prisma.sql`n.education_qualifications && ARRAY[${Prisma.join(
          params.qualifications.map((q) => Prisma.sql`${q}`),
          ', ',
        )}]::text[]`,
      );
    }

    if (params.search) {
      const searchPattern = `%${params.search}%`;
      whereClauses.push(Prisma.sql`u.full_name ILIKE ${searchPattern}`);
    }

    const whereSql = Prisma.sql`WHERE ${Prisma.join(whereClauses, ' AND ')}`;

    const usersQuery = Prisma.sql`
  SELECT
    u.id,
    u.full_name,
    u.role,
    u.avatar,
    u.gender,
    n.education_qualifications,
    a.city,
    ST_Y(n.current_nurse_location::geometry) AS latitude,
    ST_X(n.current_nurse_location::geometry) AS longitude,
    u.created_at
  FROM users u
  LEFT JOIN nurses n ON n.user_id = u.id
  LEFT JOIN addresses a ON a.user_id = u.id
  ${whereSql}
  ORDER BY u.created_at DESC
  LIMIT ${params.take}
  OFFSET ${params.skip}
`;

    const countQuery = Prisma.sql`
  SELECT COUNT(*) FROM users u
  LEFT JOIN nurses n ON n.user_id = u.id
  LEFT JOIN addresses a ON a.user_id = u.id
  ${whereSql}
`;

    const [users, countResult] = await Promise.all([
      this.db.$queryRaw<UserFromRepo[]>(usersQuery),
      this.db.$queryRaw<{ count: string }[]>(countQuery),
    ]);
    return {
      users,
      count: Number(countResult[0]?.count ?? 0),
    };
  }

  async findByEmailOrMobileNumberWithId(email: string, mobileNumber: string, userId: string): Promise<User | null> {
    const user = await this.db.user.findFirst({
      where: {
        OR: [{ email }, { mobileNumber }],
        NOT: { id: userId },
      },
    });

    return user ? toEntity(user) : null;
  }
}

function toEntity(user: UserModel): User {
  return new User({
    id: user.id,
    email: user.email ?? undefined,
    emailVerified: user.emailVerified,
    fullName: user.fullName,
    role: user.role,
    password: user.password,
    mobileNumber: user.mobileNumber,
    mobileNumberVerified: user.mobileNumberVerified,
    dob: user.dob,
    gender: user.gender,
    profileStatus: user.profileStatus,
    referralCode: user.referralCode ?? '',
    referredById: user.referredById,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
  });
}
