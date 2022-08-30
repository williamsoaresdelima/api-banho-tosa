export class PetEntity {

  public id: number;
  public name: string;
  public age: number;
  public petType: number;

  constructor(
      id: number,
      name: string,
      age: number,
      petType: number
  ) {
      this.id = id;
      this.name = name;
      this.age = age;
      this.petType = petType;
  }

  static build(
      id: number,
      name: string,
      age: number,
      petType: number
  ): PetEntity {
      return new PetEntity(
          id,
          name,
          age,
          petType
      );
  }

}
