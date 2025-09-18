import { AcademicLevel } from '@domain/entities';
import { DuplicateError, NotFoundError } from '@domain/errors';
import { IAcademicLevelRepository } from '@domain/repositories';
import { IAcademicLevelService } from '@domain/services';
import { Prisma } from '@prisma/client';

import { CreateAcademicLevelInput, UpdateAcademicLevelInput } from './dto';

export class AcademicLevelService implements IAcademicLevelService {
  constructor(private readonly academicLevelRepository: IAcademicLevelRepository) {}

  async createAcademicLevel(params: CreateAcademicLevelInput): Promise<{ id: string }> {
    const existing = await this.academicLevelRepository.findByLevel(params.level);
    if (existing) {
      throw new DuplicateError({
        message: 'Academic level already exists with this value',
      });
    }

    const academicLevel = new AcademicLevel({
      academicLevels: params.level,

      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const created = await this.academicLevelRepository.create(academicLevel);
    return { id: created.id };
  }

  async getAcademicLevels(params: {
    page?: number;
    limit?: number;
    where?: Prisma.AcademicLevelWhereInput;
    orderBy?: Prisma.AcademicLevelOrderByWithRelationInput;
    search?: string;
  }): Promise<{ academicLevels: AcademicLevel[]; total: number; page: number; limit: number; totalPages: number }> {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const searchFilter: Prisma.AcademicLevelWhereInput = params.search
      ? {
          academicLevel: {
            startsWith: params.search,
            mode: 'insensitive' as const,
          },
        }
      : {};

    const baseWhere = params.where ?? {};

    const combinedWhere: Prisma.AcademicLevelWhereInput = {
      AND: [baseWhere, searchFilter, { deletedAt: null }],
    };

    const { academicLevels, count } = await this.academicLevelRepository.findAll({
      skip,
      take: limit,
      where: combinedWhere,
      orderBy: params.orderBy,
    });

    return {
      academicLevels,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    };
  }

  async getAcademicLevelById(id: string): Promise<AcademicLevel | null> {
    const academicLevel = await this.academicLevelRepository.findById(id);
    if (!academicLevel) {
      throw new NotFoundError({ message: 'Academic level not found' });
    }
    return academicLevel;
  }

  async updateAcademicLevel(id: string, data: Partial<UpdateAcademicLevelInput>): Promise<{ id: string }> {
    if (data.level) {
      const existing = await this.academicLevelRepository.findByLevel(data.level);
      if (existing && existing.id !== id) {
        throw new DuplicateError({ message: 'Another academic level already exists with this value' });
      }
    }

    const updated = await this.academicLevelRepository.update(id, {
      ...data,
      updatedAt: new Date(),
    });

    return { id: updated.id };
  }

  async deleteAcademicLevel(id: string): Promise<void> {
    const academicLevel = await this.academicLevelRepository.findById(id);
    if (!academicLevel) {
      throw new NotFoundError({ message: 'Academic level not found' });
    }

    await this.academicLevelRepository.delete(id);
  }
}
 

//
//