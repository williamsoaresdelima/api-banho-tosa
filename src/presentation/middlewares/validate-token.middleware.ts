import jwt from 'jsonwebtoken'

import { secrets } from './../../core/config/secrets';

export const ValidateTokenMiddleware = (model: any, httpContext: string) => {

	return async (req: any, res: any, next: any) => {
    const token = req.headers['Authorization'] as string | null;

    if (!token) {
      return res.status(400)
    }

    try {
      jwt.verify(token, secrets.SECRET_JWT_CODE)
    } catch (error) {
      return res.status(400)
    }

		return next();
	}
}
