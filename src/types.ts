const TYPES = {
    CustomMiddleware: Symbol.for("CustomMiddleware"),
    ListPetInterface: Symbol.for("ListPetInterface"),
    CreatePetInterface: Symbol.for("CreatePetInterface"),
    UpdatePetInterface: Symbol.for("UpdatePetInterface"),
    DeletePetInterface: Symbol.for("DeletePetInterface"),
    FindPetByIdInterface: Symbol.for("FindPetByIdInterface"),
    ListPetTypeInterface: Symbol.for("ListPetTypeInterface"),
    CreatePetTypeInterface: Symbol.for("CreatePetTypeInterface"),
    UpdatePetTypeInterface: Symbol.for("UpdatePetTypeInterface"),
    DeletePetTypeInterface: Symbol.for("DeletePetTypeInterface"),
    PetRepositoryInterface: Symbol.for("PetRepositoryInterface"),
    UserRepositoryInterface: Symbol.for("UserRepositoryInterface"),
    FindPetTypeByIdInterface: Symbol.for("FindPetTypeByIdInterface"),
    PetTypeRepositoryInterface: Symbol.for("PetTypeRepositoryInterface"),
};

export default TYPES;