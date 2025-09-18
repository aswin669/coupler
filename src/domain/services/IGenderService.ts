import { Gender } from '@domain/entities';
import { CreateGenderInput, UpdateGenderInput } from '@routes/v1/admin/genders/dto';

export interface GenderListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GenderListResult {
  genders: Gender[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IGenderService {
  getGenders(params: GenderListParams): Promise<GenderListResult>;
  getGenderById(id: string): Promise<Gender | null>;
  createGender(data: CreateGenderInput): Promise<{ id: string }>;
  updateGender(id: string, data: UpdateGenderInput): Promise<{ id: string }>;
  deleteGender(id: string): Promise<void>;
}
