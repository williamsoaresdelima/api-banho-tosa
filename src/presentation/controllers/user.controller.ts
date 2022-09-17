import { UserEntity } from "../../core/entity/user.entity";
import { BaseHttpController, interfaces, controller, httpPost } from "inversify-express-utils";


@controller('/user')
export class UserController extends BaseHttpController implements interfaces.Controller {
	constructor() {
		super();
	}

	@httpPost("/")
	public async create(): Promise<interfaces.IHttpActionResult> {
		const userModel = UserEntity.createModel()
		
		const user = await userModel.create({
			name: 'Bill',
			email: 'bill@gmail.com',
			password: '12345678'
		});
		console.log('USER: ', user)
		await user.save()
		console.log('ALI')
		return this.json({ message: 'service ok!' });
	}
}
