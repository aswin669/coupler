import { Gender } from '@domain/entities';
import { DuplicateError, NotFoundError } from '@domain/errors';
import { IGenderRepository } from '@domain/repositories';
import { IGenderService } from '@domain/services';
import { Prisma } from '@prisma/client';

import { CreateGenderInput, UpdateGenderInput } from './dto';

export class GenderService implements IGenderService {
  constructor(private readonly genderRepository: IGenderRepository) {}

  async createGender(params: CreateGenderInput): Promise<{ id: string }> {
    const existing = await this.genderRepository.findByGender(params.gender);

    if (existing) {
      throw new DuplicateError({
        message: 'Gender already exists with this value',
      });
    }

    const gender = new Gender({
      gender: params.gender,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const created = await this.genderRepository.create(gender);

    return { id: created.id };
  }

  async getGenders(params: {
    page?: number;
    limit?: number;
    where?: Prisma.GenderWhereInput;
    orderBy?: Prisma.GenderOrderByWithRelationInput;
    search?: string;
  }): Promise<{ genders: Gender[]; total: number; page: number; limit: number; totalPages: number }> {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const searchFilter: Prisma.GenderWhereInput = params.search
      ? {
          gender: {
            startsWith: params.search,
            mode: 'insensitive' as const,
          },
        }
      : {};

    const baseWhere = params.where ?? {};

    const combinedWhere: Prisma.GenderWhereInput = {
      AND: [baseWhere, searchFilter, { deletedAt: null }],
    };

    const { genders, count } = await this.genderRepository.findAll({
      skip,
      take: limit,
      where: combinedWhere,
      orderBy: params.orderBy,
    });

    return {
      genders,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    };
  }

  async getGenderById(id: string): Promise<Gender | null> {
    const gender = await this.genderRepository.findById(id);
    if (!gender) {
      throw new NotFoundError({ message: 'Gender not found' });
    }
    return gender;
  }

  async updateGender(id: string, data: Partial<UpdateGenderInput>): Promise<{ id: string }> {
    const updated = await this.genderRepository.update(id, {
      ...data,
      updatedAt: new Date(),
    });
    return { id: updated.id };
  }

  async deleteGender(id: string): Promise<void> {
    const gender = await this.genderRepository.findById(id);
    if (!gender) {
      throw new NotFoundError({ message: 'Gender not found' });
    }
    await this.genderRepository.delete(id);
  }
}
