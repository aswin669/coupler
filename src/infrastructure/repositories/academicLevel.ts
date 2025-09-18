import { AcademicLevel } from '@domain/entities';
import { IAcademicLevelRepository } from '@domain/repositories';
import { Prisma, PrismaClient } from '@prisma/client';

export class AcademicLevelRepository implements IAcademicLevelRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(data: AcademicLevel): Promise<{ id: string }> {
    const { id } = await this.db.academicLevel.create({
      data: {
        academicLevel: data.academicLevels, // DB column = level, domain property = academicLevels
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
      },
      select: { id: true },
    });
    return { id };
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.AcademicLevelWhereInput;
    orderBy?: Prisma.AcademicLevelOrderByWithRelationInput;
  }): Promise<{ academicLevels: AcademicLevel[]; count: number }> {
    const { skip, take, where, orderBy } = params;
    const [academicLevels, count] = await Promise.all([
      this.db.academicLevel.findMany({
        skip,
        take,
        where,
        orderBy,
      }),
      this.db.academicLevel.count({ where }),
    ]);

    return {
      academicLevels: academicLevels.map(
        (record) =>
          new AcademicLevel({
            id: record.id,
            academicLevels: record.academicLevel, // map db column to domain property
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
            deletedAt: record.deletedAt,
          }),
      ),
      count,
    };
  }

  async findById(id: string): Promise<AcademicLevel | null> {
    const record = await this.db.academicLevel.findFirst({
      where: { id, deletedAt: null },
    });
    return record
      ? new AcademicLevel({
          id: record.id,
          academicLevels: record.academicLevel,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
          deletedAt: record.deletedAt,
        })
      : null;
  }

  async find(): Promise<AcademicLevel[] | null> {
    const records = await this.db.academicLevel.findMany({
      where: { deletedAt: null },
    });
    return records.map(
      (record) =>
        new AcademicLevel({
          id: record.id,
          academicLevels: record.academicLevel,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
          deletedAt: record.deletedAt,
        }),
    );
  }

  async findByLevel(academicLevels: string): Promise<AcademicLevel | null> {
    const record = await this.db.academicLevel.findFirst({
      where: { academicLevel: academicLevels, deletedAt: null },
    });
    return record
      ? new AcademicLevel({
          id: record.id,
          academicLevels: record.academicLevel,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
          deletedAt: record.deletedAt,
        })
      : null;
  }

  async findByLevels(levels: string[]): Promise<AcademicLevel[]> {
    const normalized = levels.map((l) => l.trim()).filter((l) => l.length > 0);
    if (normalized.length === 0) return [];
    const records = await this.db.academicLevel.findMany({
      where: {
        deletedAt: null,
        OR: normalized.map((l) => ({
          academicLevel: { equals: l, mode: 'insensitive' },
        })),
      },
    });

    return records.map(
      (record) =>
        new AcademicLevel({
          id: record.id,
          academicLevels: record.academicLevel,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
          deletedAt: record.deletedAt,
        }),
    );
  }

  async update(
    id: string,
    data: Prisma.AcademicLevelUncheckedUpdateInput | Prisma.AcademicLevelUpdateInput,
  ): Promise<{ id: string }> {
    const academicLevel = await this.db.academicLevel.update({
      where: { id },
      data,
      select: { id: true },
    });
    return { id: academicLevel.id };
  }

  async delete(id: string): Promise<boolean> {
    await this.db.academicLevel.delete({
      where: { id },
    });
    return true;
  }
}
 