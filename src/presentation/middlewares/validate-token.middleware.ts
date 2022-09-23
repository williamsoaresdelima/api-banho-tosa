import express from 'express'
import * as jwt from 'jsonwebtoken'

import { secrets } from './../../core/config/secrets';

export const ValidateTokenMiddleware = (req: express.Request, res: express.Response, next: any) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      mensagem: 'Token inválido'
    })
  }

  try {
    jwt.verify(token, secrets.SECRET_JWT_CODE)
  } catch (error) {

    console.log('ERROR_IN_VERIFY: ', error)
    
    return res.status(401).json({
      mensagem: 'Token inválido'
    })
  }

  return next();
}
