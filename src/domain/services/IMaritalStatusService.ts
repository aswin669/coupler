import { MaritalStatus } from '@domain/entities';

export interface MaritalStatusListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface MaritalStatusListResult {
  maritalStatuses: MaritalStatus[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IMaritalStatusService {
  getMaritalStatuses(params: MaritalStatusListParams): Promise<MaritalStatusListResult>;
  getMaritalStatusById(id: string): Promise<MaritalStatus | null>;
  createMaritalStatus(data: { maritalStatus: string }): Promise<{ id: string }>;
  updateMaritalStatus(id: string, data: { maritalStatus?: string }): Promise<{ id: string }>;
  deleteMaritalStatus(id: string): Promise<void>;
}
