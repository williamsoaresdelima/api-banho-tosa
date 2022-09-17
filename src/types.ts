const TYPES = {
    CustomMiddleware: Symbol.for("CustomMiddleware"),
    ListPetInterface: Symbol.for("ListPetInterface"),
    ListUserInterface: Symbol.for("ListUserInterface"),
    CreatePetInterface: Symbol.for("CreatePetInterface"),
    UpdatePetInterface: Symbol.for("UpdatePetInterface"),
    DeletePetInterface: Symbol.for("DeletePetInterface"),
    CreateUserInterface: Symbol.for("CreateUserInterface"),
    UpdateUserInterface: Symbol.for("UpdateUserInterface"),
    DeleteUserInterface: Symbol.for("DeleteUserInterface"),
    FindPetByIdInterface: Symbol.for("FindPetByIdInterface"),
    ListPetTypeInterface: Symbol.for("ListPetTypeInterface"),
    FindUserByIdInterface: Symbol.for("FindUserByIdInterface"),
    CreatePetTypeInterface: Symbol.for("CreatePetTypeInterface"),
    UpdatePetTypeInterface: Symbol.for("UpdatePetTypeInterface"),
    DeletePetTypeInterface: Symbol.for("DeletePetTypeInterface"),
    PetRepositoryInterface: Symbol.for("PetRepositoryInterface"),
    UserRepositoryInterface: Symbol.for("UserRepositoryInterface"),
    FindPetTypeByIdInterface: Symbol.for("FindPetTypeByIdInterface"),
    PetTypeRepositoryInterface: Symbol.for("PetTypeRepositoryInterface"),
};

export default TYPES;