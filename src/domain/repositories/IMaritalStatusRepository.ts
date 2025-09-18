import { MaritalStatus } from '@domain/entities';
import { Prisma } from '@prisma/client';

export interface IMaritalStatusRepository {
  findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.MaritalStatusWhereInput;
    orderBy?: Prisma.MaritalStatusOrderByWithRelationInput;
  }): Promise<{ maritalStatuses: MaritalStatus[]; count: number }>;

  findById(id: string): Promise<MaritalStatus | null>;

  findByMaritalStatus(maritalStatus: string): Promise<MaritalStatus | null>;

  findByMaritalStatuses(maritalStatuses: string[]): Promise<MaritalStatus[]>;

  create(data: MaritalStatus): Promise<{ id: string }>;

  update(
    id: string,
    data: Prisma.MaritalStatusUpdateInput | Prisma.MaritalStatusUncheckedUpdateInput,
  ): Promise<{ id: string }>;

  delete(id: string): Promise<boolean>;

  find(): Promise<MaritalStatus[] | null>;
}
