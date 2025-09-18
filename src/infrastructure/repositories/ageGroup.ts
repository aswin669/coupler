import { AgeGroup } from '@domain/entities';
import { IAgeGroupRepository } from '@domain/repositories';
import { Prisma, PrismaClient } from '@prisma/client';

export class AgeGroupRepository implements IAgeGroupRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(data: AgeGroup): Promise<{ id: string }> {
    const { id } = await this.db.ageGroup.create({
      data: {
        fromAge: data.fromAge,
        toAge: data.toAge,
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
    where?: Prisma.AgeGroupWhereInput;
    orderBy?: Prisma.AgeGroupOrderByWithRelationInput;
  }): Promise<{ ageGroups: AgeGroup[]; count: number }> {
    const { skip, take, where, orderBy } = params;
    const [ageGroups, count] = await Promise.all([
      this.db.ageGroup.findMany({
        skip,
        take,
        where,
        orderBy,
      }),
      this.db.ageGroup.count({ where }),
    ]);

    return { ageGroups, count };
  }

  async findById(id: string): Promise<AgeGroup | null> {
    return await this.db.ageGroup.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async find(): Promise<AgeGroup[] | null> {
    return await this.db.ageGroup.findMany({
      where: { deletedAt: null },
    });
  }

  async findByAgeRange(fromAge: number, toAge: number): Promise<AgeGroup | null> {
    return await this.db.ageGroup.findFirst({
      where: { fromAge, toAge, deletedAt: null },
    });
  }

  async findByAgeRanges(ageRanges: Array<{ fromAge: number; toAge: number }>): Promise<AgeGroup[]> {
    if (ageRanges.length === 0) return [];
    return await this.db.ageGroup.findMany({
      where: {
        deletedAt: null,
        OR: ageRanges.map((range) => ({ fromAge: range.fromAge, toAge: range.toAge })),
      },
    });
  }

  async update(
    id: string,
    data: Prisma.AgeGroupUncheckedUpdateInput | Prisma.AgeGroupUpdateInput,
  ): Promise<{ id: string }> {
    const ageGroup = await this.db.ageGroup.update({
      where: { id },
      data,
      select: { id: true },
    });
    return { id: ageGroup.id };
  }

  async delete(id: string): Promise<boolean> {
    await this.db.ageGroup.delete({
      where: { id },
    });
    return true;
  }
}
