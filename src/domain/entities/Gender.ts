export class Gender {
  public id?: string;
  public gender: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt?: Date | null;

  constructor(gender: { id?: string; gender: string; createdAt: Date; updatedAt: Date; deletedAt?: Date | null }) {
    this.id = gender.id;
    this.gender = gender.gender;
    this.createdAt = gender.createdAt;
    this.updatedAt = gender.updatedAt;
    this.deletedAt = gender.deletedAt;
  }
}
