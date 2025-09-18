import { Gender } from '@domain/entities';
import { Prisma } from '@prisma/client';

export interface IGenderRepository {
  findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.GenderWhereInput;
    orderBy?: Prisma.GenderOrderByWithRelationInput;
  }): Promise<{ genders: Gender[]; count: number }>;

  findById(id: string): Promise<Gender | null>;

  findByGender(gender: string): Promise<Gender | null>;

  findByGenders(genders: string[]): Promise<Gender[]>;

  create(data: Gender): Promise<{ id: string }>;

  update(id: string, data: Prisma.GenderUpdateInput | Prisma.GenderUncheckedUpdateInput): Promise<{ id: string }>;

  delete(id: string): Promise<boolean>;

  find(): Promise<Gender[] | null>;
}
