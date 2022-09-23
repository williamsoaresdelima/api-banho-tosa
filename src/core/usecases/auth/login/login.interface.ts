export class LoginUseCaseParams {
	email: string;
	password: string;
}

export class ResponseLoginUseCase {
	token: string;
}

export interface LoginInterface {
	execute(dto: LoginUseCaseParams): Promise<ResponseLoginUseCase>;
}