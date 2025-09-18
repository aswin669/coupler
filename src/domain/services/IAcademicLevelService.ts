import { AcademicLevel } from '@domain/entities';

export interface AcademicLevelListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface AcademicLevelListResult {
  academicLevels: AcademicLevel[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IAcademicLevelService {
  getAcademicLevels(params: AcademicLevelListParams): Promise<AcademicLevelListResult>;

  getAcademicLevelById(id: string): Promise<AcademicLevel | null>;

  createAcademicLevel(data: { level: string }): Promise<{ id: string }>;

  updateAcademicLevel(id: string, data: { level?: string }): Promise<{ id: string }>;

  deleteAcademicLevel(id: string): Promise<void>;
}
