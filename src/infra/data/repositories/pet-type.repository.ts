import { injectable } from "inversify";

import {
	PetTypeRepositoryInterface,
	PetTypeRespositoryCreateParams,
	PetTypeRespositorySearchParams
} from "../../../core/providers/data/pet-type-repository.interface";

import { PetTypeEntity } from "../../../core/entity/pet-type.entity";

let data: PetTypeEntity[] = [];

@injectable()
export class PetTypeRepository implements PetTypeRepositoryInterface {
	create(model: PetTypeRespositoryCreateParams): PetTypeEntity {
		const dataSorted = data.sort((a, b) => {
			if ( a.id > b.id ){
				return -1;
			}
			if ( a.id < b.id ){
				return 1;
			}
			return 0;
		})

		const lastId = dataSorted[0] ? dataSorted[0].id : 0

		const id = lastId + 1;

		const dataModel = {
			id,
			name: model.name,
		}

		data.push(dataModel);

		return PetTypeEntity.build(
			dataModel.id,
			dataModel.name
		);
	}

	search(model: PetTypeRespositorySearchParams): PetTypeEntity[] {
		if (model.name) {
			return data.filter(item => item.name === model.name)
		}
		return data
	}

	findById(id: number): PetTypeEntity {
		return data.find(item => item.id === id)
	}

	update(id: number, body: PetTypeRespositoryCreateParams): PetTypeEntity {
		let pet

		data = data.map(item => {
			if (item.id == id) {
				pet = {
					...item,
					...body
				}

				return pet
			}
			return item
		})

		return pet
	}

	delete(id: number): void {
		data = data.filter(item => item.id !== id)
	}
}