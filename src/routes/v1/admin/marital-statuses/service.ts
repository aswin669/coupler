import { MaritalStatus } from '@domain/entities';
import { DuplicateError, NotFoundError } from '@domain/errors';
import { IMaritalStatusRepository } from '@domain/repositories';
import { IMaritalStatusService } from '@domain/services';
import { Prisma } from '@prisma/client';

import { CreateMaritalStatusInput, UpdateMaritalStatusInput } from './dto';

export class MaritalStatusService implements IMaritalStatusService {
  constructor(private readonly maritalStatusRepository: IMaritalStatusRepository) {}

  async createMaritalStatus(params: CreateMaritalStatusInput): Promise<{ id: string }> {
    const existing = await this.maritalStatusRepository.findByMaritalStatus(params.maritalStatus);

    if (existing) {
      throw new DuplicateError({
        message: 'Marital status already exists with this value',
      });
    }

    const maritalStatus = new MaritalStatus({
      maritalStatus: params.maritalStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const created = await this.maritalStatusRepository.create(maritalStatus);

    return { id: created.id };
  }

  async getMaritalStatuses(params: {
    page?: number;
    limit?: number;
    where?: Prisma.MaritalStatusWhereInput;
    orderBy?: Prisma.MaritalStatusOrderByWithRelationInput;
    search?: string;
  }): Promise<{ maritalStatuses: MaritalStatus[]; total: number; page: number; limit: number; totalPages: number }> {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const searchFilter: Prisma.MaritalStatusWhereInput = params.search
      ? {
          maritalStatus: {
            startsWith: params.search,
            mode: 'insensitive' as const,
          },
        }
      : {};

    const baseWhere = params.where ?? {};

    const combinedWhere: Prisma.MaritalStatusWhereInput = {
      AND: [baseWhere, searchFilter, { deletedAt: null }],
    };

    const { maritalStatuses, count } = await this.maritalStatusRepository.findAll({
      skip,
      take: limit,
      where: combinedWhere,
      orderBy: params.orderBy,
    });

    return {
      maritalStatuses,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    };
  }

  async getMaritalStatusById(id: string): Promise<MaritalStatus | null> {
    const maritalStatus = await this.maritalStatusRepository.findById(id);
    if (!maritalStatus) {
      throw new NotFoundError({ message: 'Marital status not found' });
    }
    return maritalStatus;
  }

  async updateMaritalStatus(id: string, data: Partial<UpdateMaritalStatusInput>): Promise<{ id: string }> {
    const updated = await this.maritalStatusRepository.update(id, {
      ...data,
      updatedAt: new Date(),
    });
    return { id: updated.id };
  }

  async deleteMaritalStatus(id: string): Promise<void> {
    const maritalStatus = await this.maritalStatusRepository.findById(id);
    if (!maritalStatus) {
      throw new NotFoundError({ message: 'Marital status not found' });
    }
    await this.maritalStatusRepository.delete(id);
  }
}
