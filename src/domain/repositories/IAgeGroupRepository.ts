import { AgeGroup } from '@domain/entities';
import { Prisma } from '@prisma/client';

export interface IAgeGroupRepository {
  findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.AgeGroupWhereInput;
    orderBy?: Prisma.AgeGroupOrderByWithRelationInput;
  }): Promise<{ ageGroups: AgeGroup[]; count: number }>;

  findById(id: string): Promise<AgeGroup | null>;

  findByAgeRange(fromAge: number, toAge: number): Promise<AgeGroup | null>;

  findByAgeRanges(ageRanges: Array<{ fromAge: number; toAge: number }>): Promise<AgeGroup[]>;

  create(data: AgeGroup): Promise<{ id: string }>;

  update(id: string, data: Prisma.AgeGroupUpdateInput | Prisma.AgeGroupUncheckedUpdateInput): Promise<{ id: string }>;

  delete(id: string): Promise<boolean>;

  find(): Promise<AgeGroup[] | null>;
}
