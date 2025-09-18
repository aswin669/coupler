import { AgeGroup } from '@domain/entities';
import { DuplicateError, NotFoundError } from '@domain/errors';
import { IAgeGroupRepository } from '@domain/repositories';
import { IAgeGroupService } from '@domain/services';
import { Prisma } from '@prisma/client';

import { CreateAgeGroupInput, UpdateAgeGroupInput } from './dto';

export class AgeGroupService implements IAgeGroupService {
  constructor(private readonly ageGroupRepository: IAgeGroupRepository) {}

  async createAgeGroup(params: CreateAgeGroupInput): Promise<{ id: string }> {
    const existing = await this.ageGroupRepository.findByAgeRange(params.fromAge, params.toAge);

    if (existing) {
      throw new DuplicateError({
        message: 'Age group already exists with this age range',
      });
    }

    const ageGroup = new AgeGroup({
      fromAge: params.fromAge,
      toAge: params.toAge,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const created = await this.ageGroupRepository.create(ageGroup);

    return { id: created.id };
  }

  async getAgeGroups(params: {
    page?: number;
    limit?: number;
    where?: Prisma.AgeGroupWhereInput;
    orderBy?: Prisma.AgeGroupOrderByWithRelationInput;
    search?: string;
  }): Promise<{ ageGroups: AgeGroup[]; total: number; page: number; limit: number; totalPages: number }> {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const searchFilter: Prisma.AgeGroupWhereInput = params.search
      ? {
          OR: [
            {
              fromAge: {
                equals: parseInt(params.search) || 0,
              },
            },
            {
              toAge: {
                equals: parseInt(params.search) || 0,
              },
            },
          ],
        }
      : {};

    const baseWhere = params.where ?? {};

    const combinedWhere: Prisma.AgeGroupWhereInput = {
      AND: [baseWhere, searchFilter, { deletedAt: null }],
    };

    const { ageGroups, count } = await this.ageGroupRepository.findAll({
      skip,
      take: limit,
      where: combinedWhere,
      orderBy: params.orderBy,
    });

    return {
      ageGroups,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    };
  }

  async getAgeGroupById(id: string): Promise<AgeGroup | null> {
    const ageGroup = await this.ageGroupRepository.findById(id);
    if (!ageGroup) {
      throw new NotFoundError({ message: 'Age group not found' });
    }
    return ageGroup;
  }

  async updateAgeGroup(id: string, data: Partial<UpdateAgeGroupInput>): Promise<{ id: string }> {
    const updated = await this.ageGroupRepository.update(id, {
      ...data,
      updatedAt: new Date(),
    });
    return { id: updated.id };
  }

  async deleteAgeGroup(id: string): Promise<void> {
    const ageGroup = await this.ageGroupRepository.findById(id);
    if (!ageGroup) {
      throw new NotFoundError({ message: 'Age group not found' });
    }
    await this.ageGroupRepository.delete(id);
  }
}
