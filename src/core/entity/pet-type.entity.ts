export class PetTypeEntity {

  public id: number;
  public name: string;

  constructor(
      id: number,
      name: string
  ) {
      this.id = id;
      this.name = name;
  }

  static build(
      id: number,
      name: string
  ): PetTypeEntity {
      return new PetTypeEntity(
          id,
          name
      );
  }

}
