import { Gender } from '@domain/entities';
import { IGenderRepository } from '@domain/repositories';
import { Prisma, PrismaClient } from '@prisma/client';

export class GenderRepository implements IGenderRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(data: Gender): Promise<{ id: string }> {
    const { id } = await this.db.gender.create({
      data: {
        gender: data.gender,
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
    where?: Prisma.GenderWhereInput;
    orderBy?: Prisma.GenderOrderByWithRelationInput;
  }): Promise<{ genders: Gender[]; count: number }> {
    const { skip, take, where, orderBy } = params;
    const [genders, count] = await Promise.all([
      this.db.gender.findMany({
        skip,
        take,
        where,
        orderBy,
      }),
      this.db.gender.count({ where }),
    ]);

    return { genders, count };
  }

  async findById(id: string): Promise<Gender | null> {
    return await this.db.gender.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async find(): Promise<Gender[] | null> {
    return await this.db.gender.findMany({
      where: { deletedAt: null },
    });
  }

  async findByGender(gender: string): Promise<Gender | null> {
    return await this.db.gender.findFirst({
      where: { gender, deletedAt: null },
    });
  }

  async findByGenders(genders: string[]): Promise<Gender[]> {
    const normalized = genders.map((g) => g.trim()).filter((g) => g.length > 0);
    if (normalized.length === 0) return [];
    return await this.db.gender.findMany({
      where: {
        deletedAt: null,
        OR: normalized.map((g) => ({ gender: { equals: g, mode: 'insensitive' } })),
      },
    });
  }

  async update(
    id: string,
    data: Prisma.GenderUncheckedUpdateInput | Prisma.GenderUpdateInput,
  ): Promise<{ id: string }> {
    const gender = await this.db.gender.update({
      where: { id },
      data,
      select: { id: true },
    });
    return { id: gender.id };
  }

  async delete(id: string): Promise<boolean> {
    await this.db.gender.delete({
      where: { id },
    });
    return true;
  }
}
