import { MaritalStatus } from '@domain/entities';
import { IMaritalStatusRepository } from '@domain/repositories';
import { Prisma, PrismaClient } from '@prisma/client';

export class MaritalStatusRepository implements IMaritalStatusRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(data: MaritalStatus): Promise<{ id: string }> {
    const { id } = await this.db.maritalStatus.create({
      data: {
        maritalStatus: data.maritalStatus,
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
    where?: Prisma.MaritalStatusWhereInput;
    orderBy?: Prisma.MaritalStatusOrderByWithRelationInput;
  }): Promise<{ maritalStatuses: MaritalStatus[]; count: number }> {
    const { skip, take, where, orderBy } = params;
    const [maritalStatuses, count] = await Promise.all([
      this.db.maritalStatus.findMany({
        skip,
        take,
        where,
        orderBy,
      }),
      this.db.maritalStatus.count({ where }),
    ]);

    return { maritalStatuses, count };
  }

  async findById(id: string): Promise<MaritalStatus | null> {
    return await this.db.maritalStatus.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async find(): Promise<MaritalStatus[] | null> {
    return await this.db.maritalStatus.findMany({
      where: { deletedAt: null },
    });
  }

  async findByMaritalStatus(maritalStatus: string): Promise<MaritalStatus | null> {
    return await this.db.maritalStatus.findFirst({
      where: { maritalStatus, deletedAt: null },
    });
  }

  async findByMaritalStatuses(maritalStatuses: string[]): Promise<MaritalStatus[]> {
    const normalized = maritalStatuses.map((m) => m.trim()).filter((m) => m.length > 0);
    if (normalized.length === 0) return [];
    return await this.db.maritalStatus.findMany({
      where: {
        deletedAt: null,
        OR: normalized.map((m) => ({ maritalStatus: { equals: m, mode: 'insensitive' } })),
      },
    });
  }

  async update(
    id: string,
    data: Prisma.MaritalStatusUncheckedUpdateInput | Prisma.MaritalStatusUpdateInput,
  ): Promise<{ id: string }> {
    const maritalStatus = await this.db.maritalStatus.update({
      where: { id },
      data,
      select: { id: true },
    });
    return { id: maritalStatus.id };
  }

  async delete(id: string): Promise<boolean> {
    await this.db.maritalStatus.delete({
      where: { id },
    });
    return true;
  }
}
