export class AgeGroup {
  public id?: string;
  public fromAge: number;
  public toAge: number;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt?: Date | null;

  constructor(ageGroup: {
    id?: string;
    fromAge: number;
    toAge: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }) {
    this.id = ageGroup.id;
    this.fromAge = ageGroup.fromAge;
    this.toAge = ageGroup.toAge;
    this.createdAt = ageGroup.createdAt;
    this.updatedAt = ageGroup.updatedAt;
    this.deletedAt = ageGroup.deletedAt;
  }
}
