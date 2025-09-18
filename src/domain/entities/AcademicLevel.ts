export class AcademicLevel {
  public id?: string;
  public academicLevels: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt?: Date | null;
  constructor(academicLevels: {
    academicLevels: string;
    id?: string;

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }) {
    this.id = academicLevels.id;
    this.academicLevels = academicLevels.academicLevels;
    this.createdAt = academicLevels.createdAt;
    this.updatedAt = academicLevels.updatedAt;
    this.deletedAt = academicLevels.deletedAt;
  }
}
 //