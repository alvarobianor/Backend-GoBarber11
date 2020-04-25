import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Auth from '../config/Auth';

import AppError from '../errors/AppError';

interface JWTToken {
	iat: number;
	exp: number;
	sub: string;
}

export default function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		throw new AppError('JWT token is missing', 401);
	}
	const [, token] = authHeader.split(' ');
	try {
		const isValidToken = verify(token, Auth.jwt.secret);
		const { sub } = isValidToken as JWTToken; // forçar um tipo usa o 'as'
		req.user = { id: sub }; // tem que sobrescrever o @types do request do express
		return next();
	} catch {
		throw new AppError('JWT token is wrong', 401);
	}
}
