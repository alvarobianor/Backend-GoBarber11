import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Auth from '../config/Auth';

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
		throw Error('JWT token is missing');
	}
	const [, token] = authHeader.split(' ');
	try {
		const isValidToken = verify(token, Auth.jwt.secret);
		const { sub } = isValidToken as JWTToken;
		req.user = { id: sub };
		return next();
	} catch {
		throw new Error('JWT token is wrong');
	}
}
