export class MaritalStatus {
  public id?: string;
  public maritalStatus: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt?: Date | null;

  constructor(maritalStatus: {
    id?: string;
    maritalStatus: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }) {
    this.id = maritalStatus.id;
    this.maritalStatus = maritalStatus.maritalStatus;
    this.createdAt = maritalStatus.createdAt;
    this.updatedAt = maritalStatus.updatedAt;
    this.deletedAt = maritalStatus.deletedAt;
  }
}
