import { AcademicLevel } from '@domain/entities';
import { Prisma } from '@prisma/client';

export interface IAcademicLevelRepository {
  findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.AcademicLevelWhereInput;
    orderBy?: Prisma.AcademicLevelOrderByWithRelationInput;
  }): Promise<{ academicLevels: AcademicLevel[]; count: number }>;

  findById(id: string): Promise<AcademicLevel | null>;

  findByLevel(level: string): Promise<AcademicLevel | null>;

  findByLevels(levels: string[]): Promise<AcademicLevel[]>;

  create(data: AcademicLevel): Promise<{ id: string }>;

  update(
    id: string,
    data: Prisma.AcademicLevelUpdateInput | Prisma.AcademicLevelUncheckedUpdateInput,
  ): Promise<{ id: string }>;

  delete(id: string): Promise<boolean>;

  find(): Promise<AcademicLevel[] | null>;
}
