import { AgeGroup } from '@domain/entities';

export interface AgeGroupListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface AgeGroupListResult {
  ageGroups: AgeGroup[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IAgeGroupService {
  getAgeGroups(params: AgeGroupListParams): Promise<AgeGroupListResult>;
  getAgeGroupById(id: string): Promise<AgeGroup | null>;
  createAgeGroup(data: { fromAge: number; toAge: number }): Promise<{ id: string }>;
  updateAgeGroup(id: string, data: { fromAge?: number; toAge?: number }): Promise<{ id: string }>;
  deleteAgeGroup(id: string): Promise<void>;
}
