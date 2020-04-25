import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import User from '../models/User';

import AppError from '../errors/AppError';

interface RequetDTO {
	name: string;
	email: string;
	password: string;
}

class CreateUserService {
	public async execute({ name, email, password }: RequetDTO): Promise<User> {
		const userRepository = getRepository(User);
		const checkUserExists = await userRepository.findOne({ where: { email } });

		if (checkUserExists) {
			throw new AppError('Email alredy exists/used', 401);
		}

		const passwordHash = await hash(password, 9);
		const user = userRepository.create({ name, email, password: passwordHash });
		await userRepository.save(user);
		return user;
	}
}

export default CreateUserService;
