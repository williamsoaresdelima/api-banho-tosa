import { injectable } from "inversify";

import {
	PetRepositoryInterface,
	PetRespositoryCreateParams,
	PetRespositorySearchParams
} from "../../../core/providers/data/pet-repository.interface";

import { PetEntity } from "../../../core/entity/pet.entity";

let data = [];

@injectable()
export class PetRepository implements PetRepositoryInterface {
	create(model: PetRespositoryCreateParams): PetEntity {
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
			age: model.age,
			petType: model.petType
		}

		data.push(dataModel);

		return PetEntity.build(
			dataModel.id,
			dataModel.name,
			dataModel.age,
			dataModel.petType
		);
	}

	search(model: PetRespositorySearchParams): PetEntity[] {
		if (model.name) {
			return data.filter(item => item.name === model.name)
		}
		return data
	}

	findById(id: number): PetEntity {
		return data.find(item => item.id === id)
	}

	update(id: number, body: PetRespositoryCreateParams): PetEntity {
		let pet

		data = data.map(item => {
			console.log(item.id, id)
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